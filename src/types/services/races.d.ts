import { ILanguageType, IRace, IRaceService } from '@src/types/';

interface IServiceRaces {
  get: (language: ILanguageType) => Promise<IRace[]>;

  find: (index: string) => Promise<IRaceService>;
}

export { IServiceRaces };
