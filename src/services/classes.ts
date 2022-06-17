import firestore from '@react-native-firebase/firestore';
import {
  IServiceClasseGet,
  IServiceClasseGetResponse,
} from '@src/types/services/classes';

const serviceClasses = {
  get: async (language = 'en') => {
    const response = await firestore()
      .collection('classes')
      .orderBy('index')
      .get();

    const classes = response.docs.map((doc) => {
      const data = doc.data() as IServiceClasseGet;

      const name = language === 'en' ? data.nameEN : data.namePT;

      if (data.proficiency) {
        const skills = data.proficiency.data.map((item) => ({
          index: item.index,
          name: item.nameEN,
        }));

        const proficiency = { ...data.proficiency, data: skills };

        return {
          name,
          hp: data.hp,
          image: data.image,
          index: data.index,
          proficiency,
        } as IServiceClasseGetResponse;
      }

      return {
        name,
        hp: data.hp,
        image: data.image,
        index: data.index,
        proficiency: undefined,
      } as IServiceClasseGetResponse;
    });

    return classes;
  },
};

export { serviceClasses };
