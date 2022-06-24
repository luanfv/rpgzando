import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { IAttributes, ILanguage } from '@src/types';
import { IServiceClass, IServiceRace } from '@src/types/services';

interface IServiceCard {
  userUid: string;
  attributes: IAttributes;
  race: IServiceRace;
  class: IServiceClass;
  name: string;
  hp: number;
  level: number;
  items: string;
  notes: string;
  proficiencies: string;
  createdAt: FirebaseFirestoreTypes.FieldValue;
}

interface IServiceCards {
  get: (language: ILanguage, userUid?: string) => Promise<ICard>;

  post: (
    userUid: string,
    card: ICardForm,
    language: ILanguage,
  ) => Promise<ICard>;
}

export { IServiceCard, IServiceCards };
