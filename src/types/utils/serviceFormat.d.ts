import { ILanguage, IRace, IClass, ICard } from '@src/types';
import { IServiceRace, IServiceClass } from '@src/types/services';

type IFormatRace = (selectedRace: IServiceRace, language: ILanguage) => IRace;

type IFormatClass = (
  selectedClass: IServiceClass,
  language: ILanguage,
) => IClass;

type IFormatCard = (
  cardId: string,
  selectedCard: ICardForm,
  language: ILanguage,
) => ICard;

export { IFormatClass, IFormatRace, IFormatCard };
