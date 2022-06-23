import firestore from '@react-native-firebase/firestore';
import { ICard } from '@src/types';

const serviceCards = {
  get: async () => {},

  post: async (userUid: string, card: ICard) => {
    const response = await firestore()
      .collection('cards')
      .add({
        userUid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        ...card,
      });

    return response;
  },
};

export { serviceCards };
