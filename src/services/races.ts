import axios from 'axios';

import { IServiceRacesResponse } from '@src/types/services';

const serviceRaces = {
  get: async () => {
    return (await axios.get(
      'https://www.dnd5eapi.co/api/races/',
    )) as IServiceRacesResponse;
  },
};

export { serviceRaces };
