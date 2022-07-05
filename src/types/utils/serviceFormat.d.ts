import {
  ILanguageType,
  IRace,
  IClass,
  ICard,
  ICardService,
  IClassService,
} from '@src/types';

interface IFormatCardSelected extends ICardService {
  id: string;
}

type IFormatRace = (
  selectedRace: IRaceService,
  language: ILanguageType,
) => IRace;

type IFormatClass = (
  selectedClass: IClassService,
  language: ILanguageType,
) => IClass;

type IFormatCard = (
  cardId: IFormatCardSelected,
  language: ILanguageType,
) => ICard;

export { IFormatClass, IFormatRace, IFormatCard };
