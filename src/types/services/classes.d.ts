import { ILanguage, IClass } from '@src/types';

interface IServiceClass {
  index: string;
  nameEN: string;
  namePT: string;
  image: string;
  hp: number;
}

interface IServiceClasses {
  get: (language: ILanguage) => Promise<IClass[]>;

  find: (index: string) => Promise<IServiceClass>;
}

export { IServiceClass, IServiceClasses };
