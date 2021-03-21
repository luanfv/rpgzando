import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAttributes {
  for: Number;
  con: Number;
  dex: Number;
  char: Number;
  wis: Number;
  int: Number;
}

export interface IProfession {
  id: Number;
  name: String;
}

export interface IRace {
  id: Number;
  idSecondary: Number;
  name: String;
}

export interface ICreateICharacterData {
  id: String;
  name: String;
  level: Number;
  expertises: Number[];
  profession: IProfession;
  race: IRace;
}

interface ICard {
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
  cards: ICard[];
  createCharacter: (data: ICreateICharacterData) => Boolean;
  createCard: (attributes: IAttributes, hp: Number) => Boolean;
}

const CardsContext = createContext<ICardsData>({} as ICardsData);

export const CardsProvider: React.FC = ({ children }) => {
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

  const createCharacter = useCallback(
    (data: ICreateICharacterData): Boolean => {
      try {
        if (data.name.length < 1) {
          throw Error('Você precisa preencher um nome para seu personagem!');
        }

        if (data.level < 1) {
          throw Error('Você precisa possuir adicionar um nível válido');
        }

        setName(data.name);
        setLevel(data.level);
        setExpertise(data.expertises);
        setProfession(data.profession);
        setRace(data.race);

        return true;
      } catch (err) {
        return false;
      }
    },
    [],
  );

  const createCard = useCallback(
    (attributes: IAttributes, hp: Number): Boolean => {
      try {
        const date = new Date();
        const id = date.getTime();

        const newCard = {
          id: `RPGZando:${id}`,
          name: name,
          level: level,
          expertise: expertise,
          profession: profession,
          race: race,
          hp,
          attributes,
          createdAt: `${date}`,
          updatedAt: `${date}`,
        } as ICard;

        const response = updateCards([...cards, newCard]);

        if (!response) {
          throw Error('not created card');
        }

        return true;
      } catch (err) {
        return false;
      }
    },
    [name, level, expertise, profession, race, updateCards, cards],
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
    <CardsContext.Provider value={{ cards, createCharacter, createCard }}>
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
