import firestore from '@react-native-firebase/firestore';

import { IRace, IRaceService } from '@src/types';
import { IServiceRaces } from '@src/types/services';
import { formatRace } from '@src/utils';

const serviceRaces: IServiceRaces = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('races')
      .orderBy('race')
      .get();

    const races: IRace[] = response.docs.map((doc) => {
      const data = doc.data() as IRaceService;
      const myRace = formatRace(data, language);

      return myRace;
    });

    return races;
  },

  find: async (index) => {
    const response = await firestore()
      .collection('races')
      .where('index', '==', index)
      .limit(1)
      .get();

    const raceSelected = response.docs[0].data() as IRaceService;

    return raceSelected;
  },
};

export { serviceRaces };
