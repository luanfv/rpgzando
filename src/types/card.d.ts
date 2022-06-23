interface IItem {
  index: string;
  name: string;
}

interface IAttributes {
  for: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

interface ICard {
  attributes: IAttributes;
  name: string;
  level: number;
  hp: number;

  class: IItem;
  race: IItem;

  proficiencies: string;
  items: string;
  notes: string;
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

export { ICardForm, IAttributes, ICard };
