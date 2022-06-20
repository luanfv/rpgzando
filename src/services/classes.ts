import firestore from '@react-native-firebase/firestore';
import {
  IServiceClasseGet,
  IServiceClasseGetResponse,
  ISkill,
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
      const skillList = data.skills.data.map((item) => ({
        index: item.index,
        name: item.nameEN,
      })) as ISkill[];

      const skills = { ...data.skills, data: skillList };

      return {
        name,
        hp: data.hp,
        image: data.image,
        index: data.index,
        skills,
      } as IServiceClasseGetResponse;
    });

    return classes;
  },
};

export { serviceClasses };
