import { AxiosResponse } from 'axios';

interface IServiceClasse {
  index: string;
  name: string;
}

interface IServiceClassesResponse extends AxiosResponse {
  data: {
    count: 12;
    results: IServiceClasse[];
  };
}

export { IServiceClasse, IServiceClassesResponse };
