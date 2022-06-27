import { IRace, IClass } from '@src/types';

interface IAttributes {
  for: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

interface ICardForm extends IAttributes {
  name: string;
  level: number;
  class: string;
  race: string;
  hp: number;

  proficiencies: string;
  items: string;
  notes: string;
}

interface ICard {
  id: string;

  attributes: IAttributes;
  name: string;
  level: number;
  hp: number;

  class: IClass;
  race: IRace;

  proficiencies: string;
  items: string;
  notes: string;
}

export { ICardForm, IAttributes, ICard };
