import firestore from '@react-native-firebase/firestore';

import { IClass } from '@src/types';
import { IServiceClass, IServiceClasses } from '@src/types/services';

const serviceClasses: IServiceClasses = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('classes')
      .orderBy('index')
      .get();

    const classes: IClass[] = response.docs.map((doc) => {
      const data = doc.data() as IServiceClass;
      const name = language === 'en' ? data.nameEN : data.namePT;

      return {
        name,
        hp: data.hp,
        image: data.image,
        index: data.index,
      };
    });

    return classes;
  },

  find: async (index) => {
    const response = await firestore()
      .collection('classes')
      .where('index', '==', index)
      .limit(1)
      .get();

    const classSelected = response.docs[0].data() as IServiceClass;

    return classSelected;
  },
};

export { serviceClasses };
