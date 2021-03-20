import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAttributes {
  for: Number;
  con: Number;
  dex: Number;
  char: Number;
  wis: Number;
  int: Number;
}

interface IProfession {
  id: Number;
  name: String;
}

interface IRace {
  id: Number;
  idSecondary: Number;
  name: String;
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
}

interface ICardsData {
  cards: ICard[];
}

const CardsContext = createContext<ICardsData>({} as ICardsData);

export const CardsProvider: React.FC = ({ children }) => {
  const [cards, setCards] = useState([] as ICard[]);
  const [name, setName] = useState('' as String);
  const [level, setLevel] = useState(1 as Number);
  const [hp, setHp] = useState('' as String);
  const [expertise, setExpertise] = useState([] as Number[]);
  const [profession, setProfession] = useState({} as IProfession);
  const [race, setRace] = useState({} as IRace);
  const [attributes, setAttributes] = useState({} as IAttributes);

  const updateCards = useCallback(
    async (newCards: ICards[]): Promise<Boolean> => {
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
    <CardsContext.Provider value={{ cards }}>{children}</CardsContext.Provider>
  );
};

export function useCards(): ICardsData {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error('useCards must be used within an CardsProvider');
  }

  return context;
}
