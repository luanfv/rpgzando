import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { IRaceService, IRace, IClassService, IClass } from '@src/types';

interface IAttributes {
  for: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

interface ISkills {
  acrobatics: number;
  animalHandling: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleight: number;
  stealth: number;
  survival: number;
}

interface ICardForm extends IAttributes, ISkills {
  name: string;
  level: number;
  class: string;
  race: string;
  hp: number;

  proficiencies: string;
  items: string;
  notes: string;
}

interface ICardService {
  userUid: string;
  attributes: IAttributes;
  skills: ISkills;
  race: IRaceService;
  class: IClassService;
  name: string;
  hp: number;
  level: number;
  items: string;
  notes: string;
  proficiencies: string;
  createdAt: FirebaseFirestoreTypes.FieldValue;
  email: string;
}

interface ICard extends Omit<ICardService, 'userUid'> {
  id: string;
  race: IRace;
  class: IClass;
}

export { IAttributes, ISkills, ICardForm, ICardService, ICard };
