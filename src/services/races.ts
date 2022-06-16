import firestore from '@react-native-firebase/firestore';

import { IServiceRaceGet } from '@src/types/services';

const serviceRaces = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('races')
      .orderBy('race')
      .get();

    const races = response.docs.map((doc) => {
      const data = doc.data();

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
    }) as IServiceRaceGet[];

    return races;
  },
};

export { serviceRaces };
