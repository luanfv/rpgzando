import firestore from '@react-native-firebase/firestore';
import { IClass, ILanguage } from '@src/types';
import { IServiceClasseGet } from '@src/types/services';

const serviceClasses = {
  get: async (language: ILanguage = 'en') => {
    const response = await firestore()
      .collection('classes')
      .orderBy('index')
      .get();

    const classes: IClass[] = response.docs.map((doc) => {
      const data = doc.data() as IServiceClasseGet;
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

  find: async (index: string) => {
    const response = await firestore()
      .collection('classes')
      .where('index', '==', index)
      .limit(1)
      .get();

    const classSelected = response.docs[0].data() as IServiceClasseGet;

    return classSelected;
  },
};

export { serviceClasses };
