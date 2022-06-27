import firestore from '@react-native-firebase/firestore';

import { IRace } from '@src/types';
import { IServiceRace, IServiceRaces } from '@src/types/services';
import { formatRace } from '@src/utils';

const serviceRaces: IServiceRaces = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('races')
      .orderBy('race')
      .get();

    const races: IRace[] = response.docs.map((doc) => {
      const data = doc.data() as IServiceRace;
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

    const raceSelected = response.docs[0].data() as IServiceRace;

    return raceSelected;
  },
};

export { serviceRaces };
