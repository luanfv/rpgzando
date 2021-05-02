import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useApp } from './AppContext';
import { professions, races, handleRace, calcModifier } from '../utils/rules';

interface IUpdateCharacterData {
  id: String;
  name: String;
  level: String;
  hp: Number;
}

export interface IUpdateAttributesData {
  id: String;
  for: Number;
  con: Number;
  dex: Number;
  cha: Number;
  wis: Number;
  int: Number;
}
export interface IAttributes {
  for: Number;
  con: Number;
  dex: Number;
  cha: Number;
  wis: Number;
  int: Number;
}

export interface IProfession {
  id: Number;
  name: String;
}

export interface IRace {
  id: Number;
  name: String;
}

export interface ICreateICharacterData {
  name: String;
  level: Number;
  expertises: Number[];
  profession: IProfession;
  race: IRace;
}

export interface ICard {
  id: String;
  name: String;
  level: Number;
  hp: Number;
  expertise: Number[];
  profession: IProfession;
  race: IRace;
  attributes: IAttributes;
  createdAt: String;
  updatedAt: String;
}

interface ICardsData {
  name: String;
  level: Number;
  expertise: Number[];
  profession: IProfession;
  race: IRace;
  cards: ICard[];
  findCard: (_id: String) => ICard | undefined;
  resetCard: () => void;
  createCharacter: (_data: ICreateICharacterData) => Boolean;
  createCard: (_attributes: IAttributes, _hp: Number) => String | undefined;
  updateCharacter: (_character: IUpdateCharacterData) => Boolean;
  updateAttributes: (_attributes: IUpdateAttributesData) => Boolean;
}

const CardsContext = createContext<ICardsData>({} as ICardsData);

export const CardsProvider: React.FC = ({ children }) => {
  const { addWarnning, deselectIdCard } = useApp();

  const [cards, setCards] = useState([] as ICard[]);
  const [name, setName] = useState('' as String);
  const [level, setLevel] = useState(1 as Number);
  const [expertise, setExpertise] = useState([] as Number[]);
  const [profession, setProfession] = useState({} as IProfession);
  const [race, setRace] = useState({} as IRace);

  const updateCards = useCallback(
    async (newCards: ICard[]): Promise<Boolean> => {
      try {
        setCards(newCards);
        await AsyncStorage.setItem('@RPGZando:cards', JSON.stringify(newCards));

        return true;
      } catch (err) {
        return false;
      }
    },
    [],
  );

  const findCard = useCallback(
    (_id: String): ICard | undefined => cards.find((card) => card.id === _id),
    [cards],
  );

  const resetCard = useCallback((): void => {
    setName('' as String);
    setLevel(1 as Number);
    setExpertise([] as Number[]);
    setProfession({} as IProfession);
    setRace({} as IRace);

    deselectIdCard();
  }, [deselectIdCard]);

  const createCharacter = useCallback(
    (_data: ICreateICharacterData): Boolean => {
      try {
        if (_data.name.length < 1) {
          throw Error('Você precisa preencher um nome para seu personagem');
        }

        if (_data.level < 1) {
          throw Error('Você precisa possuir adicionar um nível válido');
        }

        const foundProfession = professions.find(
          (_profession) => _profession.id === _data.profession.id,
        );

        if (!foundProfession) {
          throw Error('Sua profissão não foi encontrada');
        }

        let quantityExpertise: Number = 0;

        foundProfession.expertises.forEach((_expertise) => {
          _data.expertises.forEach((id) => {
            if (id === _expertise.id) {
              quantityExpertise = Number(quantityExpertise) + 1;
            }
          });
        });

        if (foundProfession.quantityExpertise !== quantityExpertise) {
          throw Error(
            'Quantidade de perícias da profissão escolhida está incorreto',
          );
        }

        const foundRace = races.find((_race) => _race.id === _data.race.id);

        if (!foundRace) {
          throw Error('Raça selecionado não foi encontrada');
        }

        setName(_data.name);
        setLevel(_data.level);
        setProfession(_data.profession);
        setExpertise(_data.expertises);
        setRace(_data.race);

        return true;
      } catch (err) {
        const { message } = err;
        addWarnning(message);

        return false;
      }
    },
    [addWarnning],
  );

  const createCard = useCallback(
    (_attributes: IAttributes, _hp: Number): String | undefined => {
      try {
        const date = new Date();
        const id = `RPGZando:${date.getTime()}`;

        const benefits = handleRace(race.id);

        if (!benefits) {
          throw Error('fail at benefits');
        }

        const attributes = {
          for: Number(_attributes.for) + Number(benefits.for),
          con: Number(_attributes.con) + Number(benefits.con),
          dex: Number(_attributes.dex) + Number(benefits.dex),
          cha: Number(_attributes.cha) + Number(benefits.cha),
          wis: Number(_attributes.wis) + Number(benefits.wis),
          int: Number(_attributes.int) + Number(benefits.int),
        } as IAttributes;

        const newCard = {
          id,
          name: name,
          level: level,
          expertise: expertise,
          profession: profession,
          race: race,
          hp: Number(_hp) + Number(calcModifier(attributes.con)),
          attributes,
          createdAt: `${date}`,
          updatedAt: `${date}`,
        } as ICard;

        const response = updateCards([...cards, newCard]);

        if (!response) {
          throw Error('not created card');
        }

        return id;
      } catch (err) {
        return undefined;
      }
    },
    [name, level, expertise, profession, race, updateCards, cards],
  );

  const updateCharacter = useCallback(
    (_character: IUpdateCharacterData): Boolean => {
      try {
        const updatedCards = cards.map((_card) => {
          if (_card.id === _character.id) {
            return {
              ..._card,
              name: _character.name,
              hp: _character.hp,
              level: _character.level,
            };
          }

          return _card;
        });

        const response = updateCards(updatedCards as ICard[]);

        if (!response) {
          throw Error(
            'Não foi possível atualizar o personagem, tente novamente.',
          );
        }

        return true;
      } catch (err) {
        const { message } = err;
        addWarnning(message);

        return false;
      }
    },
    [cards, updateCards, addWarnning],
  );

  const updateAttributes = useCallback(
    (_attributes: IUpdateAttributesData) => {
      try {
        const updatedCards = cards.map((_card) => {
          if (_card.id === _attributes.id) {
            return {
              ..._card,
              attributes: {
                for: _attributes.for,
                dex: _attributes.dex,
                con: _attributes.con,
                wis: _attributes.wis,
                int: _attributes.int,
                cha: _attributes.cha,
              },
            };
          }

          return _card;
        });

        const response = updateCards(updatedCards as ICard[]);

        if (!response) {
          throw Error(
            'Não foi possível atualizar o personagem, tente novamente.',
          );
        }

        return true;
      } catch (err) {
        const { message } = err;
        addWarnning(message);

        return false;
      }
    },
    [addWarnning, cards, updateCards],
  );

  useEffect(() => {
    const getStorage = async () => {
      const storageCards = await AsyncStorage.getItem('@RPGZando:cards');

      if (storageCards) {
        setCards(JSON.parse(storageCards) as ICard[]);
      }
    };

    getStorage();
  }, []);

  return (
    <CardsContext.Provider
      value={{
        name,
        level,
        expertise,
        profession,
        race,
        cards,
        findCard,
        resetCard,
        createCharacter,
        createCard,
        updateCharacter,
        updateAttributes,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export function useCards(): ICardsData {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error('useCards must be used within an CardsProvider');
  }

  return context;
}
