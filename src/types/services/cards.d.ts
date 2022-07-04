import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { IAttributes, ILanguageType, ICardForm, ICard } from '@src/types';
import { IServiceClass, IServiceRace } from '@src/types/services';

type IServiceGetOthersLastResponse =
  | FirebaseFirestoreTypes.DocumentData
  | undefined;

type IQueryGetOthers = (
  filter?: IGetOthersFilter,
  lastDoc?: IServiceGetOthersLastResponse,
) => Promise<
  FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
>;

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
  email: string;
}

interface IServiceCardPost extends ICardForm {
  userUid: string;
  email: string;
}

interface IServiceCardUpdate extends ICardForm {
  id: string;
  userUid: string;
}

interface IServiceCardGetOthersResponse {
  cards: ICard[];
  lastDoc: IServiceGetOthersLastResponse;
}

interface IGetOthersFilter {
  race?: string;
  class?: string;
  email?: string;
}

interface IServiceCards {
  get: (userUid: string, language: ILanguageType) => Promise<ICard[]>;

  post: (cardForm: IServiceCardPost, language: ILanguageType) => Promise<ICard>;

  delete: (userUid: string, cardId: string) => Promise<void>;

  update: (
    cardForm: IServiceCardUpdate,
    language: ILanguageType,
  ) => Promise<ICard>;

  getOthers: (
    language: ILanguageType,
    filter?: IGetOthersFilter,
    lastDoc?: IServiceGetOthersLastResponse,
  ) => Promise<IServiceCardGetOthersResponse>;
}

export {
  IServiceCard,
  IServiceCards,
  IQueryGetOthers,
  IGetOthersFilter,
  IServiceGetOthersLastResponse,
};
