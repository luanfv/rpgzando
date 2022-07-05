import { ILanguageType, IRace, IClass, ICard, ICardService } from '@src/types';
import { IServiceRace, IServiceClass } from '@src/types/services';

interface IFormatCardSelected extends ICardService {
  id: string;
}

type IFormatRace = (
  selectedRace: IServiceRace,
  language: ILanguageType,
) => IRace;

type IFormatClass = (
  selectedClass: IServiceClass,
  language: ILanguageType,
) => IClass;

type IFormatCard = (
  cardId: IFormatCardSelected,
  language: ILanguageType,
) => ICard;

export { IFormatClass, IFormatRace, IFormatCard };
