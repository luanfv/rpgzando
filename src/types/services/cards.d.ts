import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { ILanguageType, ICardForm, ICard } from '@src/types';

type IServiceGetOthersLastResponse =
  | FirebaseFirestoreTypes.DocumentData
  | undefined;

type IQueryGetOthers = (
  filter?: IGetOthersFilter,
  lastDoc?: IServiceGetOthersLastResponse,
) => Promise<
  FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
>;

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
  IServiceCards,
  IQueryGetOthers,
  IGetOthersFilter,
  IServiceGetOthersLastResponse,
};
