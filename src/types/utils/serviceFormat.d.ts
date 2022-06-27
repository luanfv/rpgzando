import { ILanguageType, IRace, IClass, ICard } from '@src/types';
import { IServiceRace, IServiceClass } from '@src/types/services';

type IFormatRace = (selectedRace: IServiceRace, language: ILanguageType) => IRace;

type IFormatClass = (
  selectedClass: IServiceClass,
  language: ILanguageType,
) => IClass;

type IFormatCard = (
  cardId: string,
  selectedCard: ICardForm,
  language: ILanguageType,
) => ICard;

export { IFormatClass, IFormatRace, IFormatCard };
