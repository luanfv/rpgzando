import firestore from '@react-native-firebase/firestore';
import { IServiceClasseGet } from '@src/types/services/classes';

const serviceClasses = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('classes')
      .orderBy('index')
      .get();

    const classes = response.docs.map((doc) => {
      const data = doc.data();

      const name = language === 'en' ? data.nameEN : data.namePT;

      return {
        ...data,
        name,
      };
    }) as IServiceClasseGet[];

    return classes;
  },
};

export { serviceClasses };
