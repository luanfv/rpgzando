import { ILanguageType, IRace, IClass, ICard } from '@src/types';
import { IServiceRace, IServiceClass, IServiceCard } from '@src/types/services';

interface IFormatCardSelected extends IServiceCard {
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
