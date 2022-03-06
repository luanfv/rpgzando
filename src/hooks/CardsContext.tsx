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
  id: string;
  name: string;
  level: string;
  hp: number;
}

export interface IUpdateAttributesData {
  id: string;
  for: number;
  con: number;
  dex: number;
  cha: number;
  wis: number;
  int: number;
}

export interface IUpdateAnnotationsData {
  id: string;
  annotations: string;
}

export interface IAttributes {
  for: number;
  con: number;
  dex: number;
  cha: number;
  wis: number;
  int: number;
}

export interface IProfession {
  id: number;
  name: string;
}

export interface IRace {
  id: number;
  name: string;
}

export interface ICreateICharacterData {
  name: string;
  level: number;
  expertises: number[];
  profession: IProfession;
  race: IRace;
}

export interface ICard {
  id: string;
  name: string;
  level: number;
  hp: number;
  expertise: number[];
  profession: IProfession;
  race: IRace;
  attributes: IAttributes;
  createdAt: string;
  updatedAt: string;
  annotations: string;
}

interface ICardsData {
  name: string;
  level: number;
  expertise: number[];
  profession: IProfession | undefined;
  race: IRace | undefined;
  cards: ICard[];
  findCard: (id: string) => ICard | undefined;
  resetCard: () => void;
  createCharacter: (data: ICreateICharacterData) => boolean;
  createCard: (attributes: IAttributes, hp: number) => string | undefined;
  updateCharacter: (character: IUpdateCharacterData) => boolean;
  updateAttributes: (attributes: IUpdateAttributesData) => boolean;
  updateAnnotations: (data: IUpdateAnnotationsData) => boolean;
  removeCard: (id: string) => boolean;
}

const CardsContext = createContext<ICardsData>({} as ICardsData);

export const CardsProvider: React.FC = ({ children }) => {
  const { addWarnning, deselectIdCard } = useApp();

  const [cards, setCards] = useState<ICard[]>([]);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [expertise, setExpertise] = useState<number[]>([]);
  const [profession, setProfession] = useState<IProfession>();
  const [race, setRace] = useState<IRace>();

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
    (id: string): ICard | undefined => cards.find((card) => card.id === id),
    [cards],
  );

  const resetCard = useCallback((): void => {
    setName('');
    setLevel(1);
    setExpertise([]);
    setProfession(undefined);
    setRace(undefined);

    deselectIdCard();
  }, [deselectIdCard]);

  const createCharacter = useCallback(
    (data: ICreateICharacterData): boolean => {
      try {
        if (data.name.length < 1) {
          throw Error('Você precisa preencher um nome para seu personagem');
        }

        if (data.level < 1) {
          throw Error('Você precisa possuir adicionar um nível válido');
        }

        const foundProfession = professions.find(
          (item) => item.id === data.profession.id,
        );

        if (!foundProfession) {
          throw Error('Sua profissão não foi encontrada');
        }

        let quantityExpertise = 0;

        foundProfession.expertises.forEach((item) => {
          data.expertises.forEach((id) => {
            if (id === item.id) {
              quantityExpertise = quantityExpertise + 1;
            }
          });
        });

        if (foundProfession.quantityExpertise !== quantityExpertise) {
          throw Error(
            'Quantidade de perícias da profissão escolhida está incorreto',
          );
        }

        const foundRace = races.find((item) => item.id === data.race.id);

        if (!foundRace) {
          throw Error('Raça selecionado não foi encontrada');
        }

        setName(data.name);
        setLevel(data.level);
        setProfession(data.profession);
        setExpertise(data.expertises);
        setRace(data.race);

        return true;
      } catch (err: any) {
        if (err) {
          addWarnning(err.message);
        }

        return false;
      }
    },
    [addWarnning],
  );

  const createCard = useCallback(
    (attributes: IAttributes, hp: number): string | undefined => {
      try {
        const date = new Date();
        const id = `RPGZando:${date.getTime()}`;

        const benefits = race && handleRace(race.id);

        if (!benefits) {
          throw Error('fail at benefits');
        }

        const attributesUpdated = {
          for: attributes.for + benefits.for,
          con: attributes.con + benefits.con,
          dex: attributes.dex + benefits.dex,
          cha: attributes.cha + benefits.cha,
          wis: attributes.wis + benefits.wis,
          int: attributes.int + benefits.int,
        };

        const newCard = {
          id,
          name: name,
          level: level,
          expertise: expertise,
          profession: profession,
          race: race,
          hp: Number(hp) + Number(calcModifier(attributes.con)),
          attributes: attributesUpdated,
          createdAt: `${date}`,
          updatedAt: `${date}`,
          annotations: '',
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
    (character: IUpdateCharacterData): boolean => {
      try {
        const updatedCards = cards.map((card) => {
          if (card.id === character.id) {
            return {
              ...card,
              name: character.name,
              hp: character.hp,
              level: character.level,
              updatedAt: `${new Date()}`,
            };
          }

          return card;
        });

        const response = updateCards(updatedCards as ICard[]);

        if (!response) {
          throw Error(
            'Não foi possível atualizar o personagem, tente novamente.',
          );
        }

        return true;
      } catch (err: any) {
        if (err) {
          addWarnning(err.message);
        }

        return false;
      }
    },
    [cards, updateCards, addWarnning],
  );

  const updateAttributes = useCallback(
    (attributes: IUpdateAttributesData) => {
      try {
        const updatedCards = cards.map((card) => {
          if (card.id === attributes.id) {
            return {
              ...card,
              attributes: {
                for: attributes.for,
                dex: attributes.dex,
                con: attributes.con,
                wis: attributes.wis,
                int: attributes.int,
                cha: attributes.cha,
              },
              updatedAt: `${new Date()}`,
            };
          }

          return card;
        });

        const response = updateCards(updatedCards);

        if (!response) {
          throw Error(
            'Não foi possível atualizar o personagem, tente novamente.',
          );
        }

        return true;
      } catch (err: any) {
        if (err) {
          addWarnning(err.message);
        }

        return false;
      }
    },
    [addWarnning, cards, updateCards],
  );

  const updateAnnotations = useCallback(
    (data: IUpdateAnnotationsData) => {
      try {
        const updatedCards = cards.map((card) => {
          if (card.id === data.id) {
            return {
              ...card,
              annotations: data.annotations,
              updatedAt: `${new Date()}`,
            };
          }

          return card;
        });

        const response = updateCards(updatedCards);

        if (!response) {
          throw Error(
            'Não foi possível atualizar suas anotações, tente novamente.',
          );
        }

        return true;
      } catch (err: any) {
        if (err) {
          addWarnning(err.message);
        }

        return false;
      }
    },
    [addWarnning, cards, updateCards],
  );

  const removeCard = useCallback(
    (id): boolean => {
      try {
        const updatedCards = cards.filter((item) => item.id !== id);

        if (!updatedCards) {
          throw Error('Sua ficha não foi encontrada.');
        }

        const response = updateCards(updatedCards);

        if (!response) {
          throw Error('Ocorreu um erro ao remover sua ficha.');
        }

        return true;
      } catch (err: any) {
        if (err) {
          addWarnning(err.message);
        }

        return false;
      }
    },
    [addWarnning, cards, updateCards],
  );

  useEffect(() => {
    const getStorage = async () => {
      const storageCards = await AsyncStorage.getItem('@RPGZando:cards');

      if (storageCards) {
        setCards(JSON.parse(storageCards));
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
        updateAnnotations,
        removeCard,
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
