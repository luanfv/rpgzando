import firestore from '@react-native-firebase/firestore';

import { ICard } from '@src/types';
import { IServiceCard, IServiceCards } from '@src/types/services';
import { serviceClasses, serviceRaces } from '@src/services';
import { formatCard } from '@src/utils/serviceFormat';

const serviceCards: IServiceCards = {
  get: async (userUid, language = 'en') => {
    const response = await firestore()
      .collection('cards')
      .where('userUid', '==', userUid)
      .orderBy('createdAt', 'desc')
      .get();

    const cards: ICard[] = response.docs.map((doc) => {
      const data = doc.data() as IServiceCard;

      return formatCard({ ...data, id: doc.id }, language);
    });

    return cards;
  },

  post: async (cardForm, language = 'en') => {
    const raceSelected = await serviceRaces.find(cardForm.race);
    const classSelected = await serviceClasses.find(cardForm.class);

    const createdAt = firestore.FieldValue.serverTimestamp();
    const attributes = {
      for: cardForm.for,
      dex: cardForm.dex,
      con: cardForm.con,
      int: cardForm.int,
      wis: cardForm.wis,
      cha: cardForm.cha,
    };

    const newCard: IServiceCard = {
      createdAt,
      attributes,

      race: raceSelected,
      class: classSelected,

      userUid: cardForm.userUid,
      name: cardForm.name,
      hp: cardForm.hp,
      level: cardForm.level,
      items: cardForm.items,
      notes: cardForm.notes,
      proficiencies: cardForm.proficiencies,
      email: cardForm.email,
    };

    const data = await firestore().collection('cards').add(newCard);

    const response = await firestore().collection('cards').doc(data.id).get();
    const card = response.data() as IServiceCard;

    return formatCard({ ...card, id: data.id }, language);
  },

  delete: async (userUid, cardId) => {
    const response = await firestore().collection('cards').doc(cardId).get();
    const card = response.data() as IServiceCard;

    if (userUid !== card.userUid) {
      throw Error();
    }

    await firestore().collection('cards').doc(cardId).delete();
  },

  update: async (cardForm, language) => {
    const response = await firestore()
      .collection('cards')
      .doc(cardForm.id)
      .get();
    const card = response.data() as IServiceCard;

    if (cardForm.userUid !== card.userUid) {
      throw Error();
    }

    const raceSelected = await serviceRaces.find(cardForm.race);
    const classSelected = await serviceClasses.find(cardForm.class);
    const attributes = {
      for: cardForm.for,
      dex: cardForm.dex,
      con: cardForm.con,
      int: cardForm.int,
      wis: cardForm.wis,
      cha: cardForm.cha,
    };

    await firestore().collection('cards').doc(cardForm.id).update({
      race: raceSelected,
      class: classSelected,

      attributes,

      name: cardForm.name,
      hp: cardForm.hp,
      level: cardForm.level,
      items: cardForm.items,
      notes: cardForm.notes,
      proficiencies: cardForm.proficiencies,
    });

    const updatedResponse = await firestore()
      .collection('cards')
      .doc(cardForm.id)
      .get();
    const updatedCard = updatedResponse.data() as IServiceCard;

    return formatCard({ ...updatedCard, id: updatedResponse.id }, language);
  },

  getOthers: async (userUid, language = 'en', filter) => {
    const cards: ICard[] = [];
    const response = await firestore()
      .collection('cards')
      .where('userUid', '!=', userUid)
      .get();

    response.docs.forEach((doc) => {
      const data = doc.data() as IServiceCard;

      if (filter) {
        if (!!filter.email && filter.email !== data.email) {
          return;
        }

        if (
          filter.classes.length > 0 &&
          filter.classes.indexOf(data.class.index) === -1
        ) {
          return;
        }

        if (
          filter.races.length > 0 &&
          filter.races.indexOf(data.race.index) === -1
        ) {
          return;
        }
      }

      cards.push(formatCard({ ...data, id: doc.id }, language));
    });

    return cards;
  },
};

export { serviceCards };
