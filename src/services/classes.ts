import firestore from '@react-native-firebase/firestore';

import { IClass, IClassService } from '@src/types';
import { IServiceClasses } from '@src/types/services';
import { formatClass } from '@src/utils';

const serviceClasses: IServiceClasses = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('classes')
      .orderBy('index')
      .get();

    const classes: IClass[] = response.docs.map((doc) => {
      const data = doc.data() as IClassService;
      const myClass = formatClass(data, language);

      return myClass;
    });

    return classes;
  },

  find: async (index) => {
    const response = await firestore()
      .collection('classes')
      .where('index', '==', index)
      .limit(1)
      .get();

    const classSelected = response.docs[0].data() as IClassService;

    return classSelected;
  },
};

export { serviceClasses };
