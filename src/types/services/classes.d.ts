import { AxiosResponse } from 'axios';

interface IServiceClasse {
  index: string;
  name: string;
}

interface IServiceClassesResponse extends AxiosResponse {
  data: {
    count: number;
    results: IServiceClasse[];
  };
}

export { IServiceClasse, IServiceClassesResponse };
