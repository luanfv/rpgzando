import DwarfImage from '../assets/images/races/dwarf.png';
import DragonbornImage from '../assets/images/races/dragonborn.png';
import ElfImage from '../assets/images/races/elf.png';
import GnomeImage from '../assets/images/races/gnome.png';
import HalflingImage from '../assets/images/races/halfling.png';
import HumanImage from '../assets/images/races/human.png';

import PaladinImage from '../assets/images/profession/paladin.png';
import BarbaricImage from '../assets/images/profession/barbaric.png';
import BardImage from '../assets/images/profession/bard.png';
import RogueImage from '../assets/images/profession/rogue.png';
import WizardImage from '../assets/images/profession/wizard.png';
import ClericImage from '../assets/images/profession/cleric.png';
import RangerImage from '../assets/images/profession/ranger.png';
import DruidImage from '../assets/images/profession/druid.png';
import FighterImage from '../assets/images/profession/fighter.png';
import WarlockImage from '../assets/images/profession/warlock.png';
import SorcererImage from '../assets/images/profession/sorcerer.png';
import MonkImage from '../assets/images/profession/monk.png';

interface IAttributes {
  for: Number;
  con: Number;
  dex: Number;
  cha: Number;
  wis: Number;
  int: Number;
}

interface IRace {
  id: Number;
  name: String;
  race: Number;
  subRace: Number;
  desc: String;
  image: FileReader;
}

interface IExpertise {
  id: Number;
  desc: String;
  type: Number;
  checked: Boolean;
}

interface IProfession {
  id: Number;
  name: String;
  hp: Number;
  image: FileReader;
  expertises: IExpertise[];
  quantityExpertise: Number;
}

export const races: IRace[] = [
  {
    id: 1,
    name: 'Anão da Colina',
    race: 1,
    subRace: 1,
    desc: '+2 CON, +1 SAB',
    image: DwarfImage,
  },
  {
    id: 2,
    name: 'Anão da Montanha',
    race: 1,
    subRace: 2,
    desc: '+2 CON, +2 FOR',
    image: DwarfImage,
  },
  {
    id: 3,
    name: 'Draconato',
    race: 2,
    subRace: 1,
    desc: '+2 FOR, +1 CAR',
    image: DragonbornImage,
  },
  {
    id: 4,
    name: 'Elfo Alto',
    race: 3,
    subRace: 1,
    desc: '+2 DES, +1 INT',
    image: ElfImage,
  },
  {
    id: 5,
    name: 'Elfo da Floresta',
    race: 3,
    subRace: 2,
    desc: '+2 DES, +1 SAB',
    image: ElfImage,
  },
  {
    id: 6,
    name: 'Elfo Negro',
    race: 3,
    subRace: 3,
    desc: '+2 DES, +1 INT',
    image: ElfImage,
  },
  {
    id: 7,
    name: 'Gnomo da Floresta',
    race: 4,
    subRace: 1,
    desc: '+2 INT, +1 DES',
    image: GnomeImage,
  },
  {
    id: 8,
    name: 'Gnomo da Pedra',
    race: 4,
    subRace: 2,
    desc: '+2 INT, +1 CON',
    image: GnomeImage,
  },
  {
    id: 9,
    name: 'Halfling Leve',
    race: 5,
    subRace: 1,
    desc: '+2 DES, +1 CAR',
    image: HalflingImage,
  },
  {
    id: 10,
    name: 'Halfing Robusto',
    race: 5,
    subRace: 2,
    desc: '+2 DES, +1 CON',
    image: HalflingImage,
  },
  {
    id: 11,
    name: 'Humano',
    race: 6,
    subRace: 1,
    desc: '+1 FOR, +1 DES, +1 CON, +1 INT, +1 SAB, +1 CAR',
    image: HumanImage,
  },
];

// 1- FOR
// 2- DES
// 3- CON
// 4- INT
// 5- SAB
// 6- CAR

export const expertises: IExpertise[] = [
  { id: 1, desc: 'Atletismo', type: 1, checked: false },
  { id: 2, desc: 'Acrobacia', type: 2, checked: false },
  { id: 3, desc: 'Furtividade', type: 2, checked: false },
  { id: 4, desc: 'Prestidigitação', type: 2, checked: false },
  { id: 5, desc: 'Arcanismo', type: 4, checked: false },
  { id: 6, desc: 'História', type: 4, checked: false },
  { id: 7, desc: 'Investigação', type: 4, checked: false },
  { id: 8, desc: 'Natureza', type: 4, checked: false },
  { id: 9, desc: 'Religião', type: 4, checked: false },
  { id: 10, desc: 'Adestrar Animais', type: 5, checked: false },
  { id: 11, desc: 'Intuição', type: 5, checked: false },
  { id: 12, desc: 'Medicina', type: 5, checked: false },
  { id: 13, desc: 'Percepção', type: 5, checked: false },
  { id: 14, desc: 'Sobrevivência', type: 5, checked: false },
  { id: 15, desc: 'Atuação', type: 6, checked: false },
  { id: 16, desc: 'Enganação', type: 6, checked: false },
  { id: 17, desc: 'Intimidação', type: 6, checked: false },
  { id: 18, desc: 'Persuasão', type: 6, checked: false },
];

export const professions: IProfession[] = [
  {
    id: 1,
    name: 'Paladino',
    hp: 10,
    image: PaladinImage,
    expertises: [
      expertises[0],
      expertises[10],
      expertises[16],
      expertises[11],
      expertises[17],
      expertises[8],
    ],
    quantityExpertise: 2,
  },
  {
    id: 2,
    name: 'Barbaro',
    hp: 12,
    image: BarbaricImage,
    expertises: [
      expertises[0],
      expertises[9],
      expertises[16],
      expertises[7],
      expertises[12],
      expertises[13],
    ],
    quantityExpertise: 2,
  },
  {
    id: 3,
    name: 'Bardo',
    hp: 8,
    image: BardImage,
    expertises: expertises,
    quantityExpertise: 3,
  },
  {
    id: 4,
    name: 'Ladino',
    hp: 8,
    image: RogueImage,
    expertises: [
      expertises[0],
      expertises[1],
      expertises[14],
      expertises[15],
      expertises[2],
      expertises[16],
      expertises[10],
      expertises[6],
      expertises[12],
      expertises[17],
      expertises[3],
    ],
    quantityExpertise: 4,
  },
  {
    id: 5,
    name: 'Mago',
    hp: 6,
    image: WizardImage,
    expertises: [
      expertises[4],
      expertises[5],
      expertises[10],
      expertises[6],
      expertises[11],
      expertises[8],
    ],
    quantityExpertise: 2,
  },
  {
    id: 6,
    name: 'Clerigo',
    hp: 8,
    image: ClericImage,
    expertises: [
      expertises[5],
      expertises[10],
      expertises[11],
      expertises[17],
      expertises[8],
    ],
    quantityExpertise: 2,
  },
  {
    id: 7,
    name: 'Patrulheiro',
    hp: 10,
    image: RangerImage,
    expertises: [
      expertises[1],
      expertises[9],
      expertises[0],
      expertises[2],
      expertises[10],
      expertises[6],
      expertises[7],
      expertises[12],
      expertises[14],
    ],
    quantityExpertise: 3,
  },
  {
    id: 8,
    name: 'Druida',
    hp: 8,
    image: DruidImage,
    expertises: [
      expertises[4],
      expertises[9],
      expertises[10],
      expertises[11],
      expertises[7],
      expertises[12],
      expertises[8],
      expertises[13],
    ],
    quantityExpertise: 2,
  },
  {
    id: 9,
    name: 'Guerreiro',
    hp: 10,
    image: FighterImage,
    expertises: [
      expertises[1],
      expertises[9],
      expertises[0],
      expertises[5],
      expertises[10],
      expertises[16],
      expertises[12],
      expertises[13],
    ],
    quantityExpertise: 2,
  },
  {
    id: 10,
    name: 'Bruxo',
    hp: 8,
    image: WarlockImage,
    expertises: [
      expertises[4],
      expertises[15],
      expertises[5],
      expertises[16],
      expertises[6],
      expertises[7],
      expertises[8],
    ],
    quantityExpertise: 2,
  },
  {
    id: 11,
    name: 'Feiticeiro',
    hp: 6,
    image: SorcererImage,
    expertises: [
      expertises[4],
      expertises[15],
      expertises[10],
      expertises[16],
      expertises[17],
      expertises[8],
    ],
    quantityExpertise: 2,
  },
  {
    id: 12,
    name: 'Monge',
    hp: 8,
    image: MonkImage,
    expertises: [
      expertises[1],
      expertises[0],
      expertises[2],
      expertises[5],
      expertises[10],
      expertises[8],
    ],
    quantityExpertise: 2,
  },
];

export const handleRace = (
  race: Number,
  type: Number,
): IAttributes | undefined => {
  let isError: Boolean = false;
  const attributes: IAttributes = {
    for: 0,
    dex: 0,
    con: 0,
    wis: 0,
    int: 0,
    cha: 0,
  };

  switch (race) {
    case 1:
      attributes.con = Number(attributes.con) + 2;

      if (type === 1) {
        attributes.wis = Number(attributes.wis) + 1;
      } else if (type === 2) {
        attributes.for = Number(attributes.for) + 2;
      } else {
        isError = true;
      }
      break;
    case 2:
      attributes.for = Number(attributes.for) + 2;
      attributes.cha = Number(attributes.cha) + 1;
      break;
    case 3:
      attributes.dex = Number(attributes.dex) + 2;

      if (type === 1) {
        attributes.int = Number(attributes.int) + 1;
      } else if (type === 2) {
        attributes.wis = Number(attributes.wis) + 1;
      } else if (type === 3) {
        attributes.cha = Number(attributes.cha) + 1;
      } else {
        isError = true;
      }
      break;
    case 4:
      attributes.int = Number(attributes.int) + 2;

      if (type === 1) {
        attributes.dex = Number(attributes.dex) + 1;
      } else if (type === 2) {
        attributes.con = Number(attributes.con) + 1;
      } else {
        isError = true;
      }
      break;
    case 5:
      attributes.dex = Number(attributes.dex) + 2;

      if (type === 1) {
        attributes.cha = Number(attributes.cha) + 1;
      } else if (type === 2) {
        attributes.con = Number(attributes.con) + 1;
      } else {
        isError = true;
      }
      break;
    case 6:
      attributes.for = Number(attributes.for) + 1;
      attributes.dex = Number(attributes.dex) + 1;
      attributes.con = Number(attributes.con) + 1;
      attributes.wis = Number(attributes.wis) + 1;
      attributes.int = Number(attributes.int) + 1;
      attributes.cha = Number(attributes.cha) + 1;
      break;
    default:
      isError = true;
      break;
  }

  if (isError) {
    return undefined;
  }

  return attributes;
};

export const calcModifier = (modifier: Number): String => {
  const value: Number = (Number(modifier) - 10) / 2;

  if (value > 0) {
    return `+${Math.trunc(Number(value))}`;
  }

  return `${Number(value).toFixed(0)}`;
};
