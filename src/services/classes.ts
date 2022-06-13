import axios, { AxiosResponse } from 'axios';

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

const serviceClasses = {
  get: async () => {
    return (await axios.get(
      'https://www.dnd5eapi.co/api/classes/',
    )) as IServiceClassesResponse;
  },
};

export { serviceClasses };
