import { ILanguageType, IClassService, IClass } from '@src/types';

interface IServiceClasses {
  get: (language: ILanguageType) => Promise<IClass[]>;

  find: (index: string) => Promise<IClassService>;
}

export { IServiceClasses };
