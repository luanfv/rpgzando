import { ILanguage, IRace, IClass } from '@src/types';
import { IServiceRace, IServiceClass } from '@src/types/services';

type IFormatRace = (selectedRace: IServiceRace, language: ILanguage) => IRace;

type IFormatClass = (
  selectedClass: IServiceClass,
  language: ILanguage,
) => IClass;

export { IFormatClass, IFormatRace };
