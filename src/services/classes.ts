import firestore from '@react-native-firebase/firestore';
import { IClass } from '@src/types';
import { IServiceClasseGet } from '@src/types/services';

const serviceClasses = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('classes')
      .orderBy('index')
      .get();

    const classes = response.docs.map((doc) => {
      const data = doc.data() as IServiceClasseGet;
      const name = language === 'en' ? data.nameEN : data.namePT;

      return {
        name,
        hp: data.hp,
        image: data.image,
        index: data.index,
      } as IClass;
    });

    return classes;
  },

  find: async (index: string, language = 'en') => {
    const response = await firestore()
      .collection('classes')
      .where('index', '==', index)
      .limit(1)
      .get();

    const classSelected = response.docs[0].data() as IServiceClasseGet;
    const name =
      language === 'en' ? classSelected.nameEN : classSelected.namePT;

    return {
      name,
      hp: classSelected.hp,
      image: classSelected.image,
      index: classSelected.index,
    } as IClass;
  },
};

export { serviceClasses };
