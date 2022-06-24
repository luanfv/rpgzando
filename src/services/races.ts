import firestore from '@react-native-firebase/firestore';

import { ILanguage, IRace } from '@src/types';
import { IServiceRaceGet } from '@src/types/services';

const serviceRaces = {
  get: async (language: ILanguage = 'en') => {
    const response = await firestore()
      .collection('races')
      .orderBy('race')
      .get();

    const races: IRace[] = response.docs.map((doc) => {
      const data = doc.data() as IServiceRaceGet;

      const name = language === 'en' ? data.nameEN : data.namePT;
      const description =
        language === 'en' ? data.descriptionEN : data.descriptionPT;

      return {
        index: data.index,
        race: data.race,
        image: data.image,
        name,
        description,
      };
    });

    return races;
  },

  find: async (index: string) => {
    const response = await firestore()
      .collection('races')
      .where('index', '==', index)
      .limit(1)
      .get();

    const raceSelected = response.docs[0].data() as IServiceRaceGet;

    return raceSelected;
  },
};

export { serviceRaces };
