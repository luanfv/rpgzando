import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { IAttributes } from '@src/types';
import { IServiceClasseGet, IServiceRaceGet } from '@src/types/services';

interface IServiceCard {
  userUid: string;
  attributes: IAttributes;
  race: IServiceRaceGet;
  class: IServiceClasseGet;
  name: string;
  hp: number;
  level: number;
  items: string;
  notes: string;
  proficiencies: string;
  createdAt: FirebaseFirestoreTypes.FieldValue;
}

export { IServiceCard };
