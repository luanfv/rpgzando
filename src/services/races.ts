import firestore from '@react-native-firebase/firestore';

import { IRace } from '@src/types';
import { IServiceRaceGet } from '@src/types/services';

const serviceRaces = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('races')
      .orderBy('race')
      .get();

    const races = response.docs.map((doc) => {
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
      } as IRace;
    });

    return races;
  },

  find: async (index: string, language = 'en') => {
    const response = await firestore()
      .collection('races')
      .where('index', '==', index)
      .limit(1)
      .get();

    const raceSelected = response.docs[0].data() as IServiceRaceGet;

    const name = language === 'en' ? raceSelected.nameEN : raceSelected.namePT;
    const description =
      language === 'en'
        ? raceSelected.descriptionEN
        : raceSelected.descriptionPT;

    return {
      index: raceSelected.index,
      race: raceSelected.race,
      image: raceSelected.image,
      name,
      description,
    } as IRace;
  },
};

export { serviceRaces };
