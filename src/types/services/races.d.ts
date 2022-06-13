import { AxiosResponse } from 'axios';

interface IServiceRace {
  index: string;
  name: string;
}

interface IServiceRacesResponse extends AxiosResponse {
  data: {
    count: number;
    results: IServiceRace[];
  };
}

export { IServiceRace, IServiceRacesResponse };
