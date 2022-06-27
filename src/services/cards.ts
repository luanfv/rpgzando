import firestore from '@react-native-firebase/firestore';

import { ICard } from '@src/types';
import { IServiceCard, IServiceCards } from '@src/types/services';
import { serviceClasses, serviceRaces } from '@src/services';
import { formatCard } from '@src/utils/serviceFormat';

const serviceCards: IServiceCards = {
  get: async (language = 'en', userUid) => {
    const response = userUid
      ? await firestore()
          .collection('cards')
          .where('userUid', '==', userUid)
          .orderBy('createdAt', 'desc')
          .get()
      : await firestore().collection('cards').get();

    const cards: ICard[] = response.docs.map((doc) => {
      const card = doc.data() as IServiceCard;
      const cardFormatted = formatCard(doc.id, card, language);

      return cardFormatted;
    });

    return cards;
  },

  post: async (userUid, cardForm, language = 'en') => {
    const raceSelected = await serviceRaces.find(cardForm.race);
    const classSelected = await serviceClasses.find(cardForm.class);

    const newCard: IServiceCard = {
      userUid,
      createdAt: firestore.FieldValue.serverTimestamp(),
      race: raceSelected,
      class: classSelected,
      attributes: {
        for: cardForm.for,
        dex: cardForm.dex,
        con: cardForm.con,
        int: cardForm.int,
        wis: cardForm.wis,
        cha: cardForm.cha,
      },
      name: cardForm.name,
      hp: cardForm.hp,
      level: cardForm.level,
      items: cardForm.items,
      notes: cardForm.notes,
      proficiencies: cardForm.proficiencies,
    };

    const data = await firestore().collection('cards').add(newCard);
    const newCardFormatted = formatCard(data.id, cardForm, language);

    return newCardFormatted;
  },

  delete: async (cardId) => {
    await firestore().collection('cards').doc(cardId).delete();
  },

  update: async (cardId, cardForm, language) => {
    const raceSelected = await serviceRaces.find(cardForm.race);
    const classSelected = await serviceClasses.find(cardForm.class);

    const cardFormatted = formatCard(cardId, cardForm, language);

    await firestore().collection('cards').doc(cardId).update({
      race: raceSelected,
      class: classSelected,

      attributes: cardFormatted.attributes,
      name: cardFormatted.name,
      hp: cardFormatted.hp,
      level: cardFormatted.level,
      items: cardFormatted.items,
      notes: cardFormatted.notes,
      proficiencies: cardFormatted.proficiencies,
    });

    return cardFormatted;
  },
};

export { serviceCards };
