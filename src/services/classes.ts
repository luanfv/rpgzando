import axios from 'axios';

import { IServiceClassesResponse } from '@src/types/services';

const serviceClasses = {
  get: async () => {
    return (await axios.get(
      'https://www.dnd5eapi.co/api/classes/',
    )) as IServiceClassesResponse;
  },
};

export { serviceClasses };
