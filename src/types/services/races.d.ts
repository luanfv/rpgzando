import { ILanguageType, IRace } from '@src/types/';

interface IServiceRace {
  index: string;
  race: string;
  image: string;
  nameEN: string;
  namePT: string;
  descriptionEN: string;
  descriptionPT: string;
}

interface IServiceRaces {
  get: (language: ILanguageType) => Promise<IRace[]>;

  find: (index: string) => Promise<IServiceRace>;
}

export { IServiceRace, IServiceRaces };
