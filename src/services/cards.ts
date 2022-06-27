import firestore from '@react-native-firebase/firestore';

import { ICard } from '@src/types';
import { IServiceCard, IServiceCards } from '@src/types/services';
import { serviceClasses, serviceRaces } from '@src/services';
import { formatClass, formatRace } from '@src/utils';

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
      const data = doc.data() as IServiceCard;

      const myClass = formatClass(data.class, language);
      const myRace = formatRace(data.race, language);

      return {
        id: doc.id,
        class: myClass,
        race: myRace,
        attributes: data.attributes,
        hp: data.hp,
        items: data.items,
        level: data.level,
        name: data.name,
        notes: data.notes,
        proficiencies: data.proficiencies,
      };
    });

    return cards;
  },

  post: async (userUid, card, language = 'en') => {
    const raceSelected = await serviceRaces.find(card.race);
    const classSelected = await serviceClasses.find(card.class);

    const attributes = {
      for: card.for,
      dex: card.dex,
      con: card.con,
      int: card.int,
      wis: card.wis,
      cha: card.cha,
    };

    const newCard: IServiceCard = {
      userUid,
      attributes,
      createdAt: firestore.FieldValue.serverTimestamp(),
      race: raceSelected,
      class: classSelected,
      name: card.name,
      hp: card.hp,
      level: card.level,
      items: card.items,
      notes: card.notes,
      proficiencies: card.proficiencies,
    };

    const data = await firestore().collection('cards').add(newCard);

    const raceFormatted = formatRace(newCard.race, language);
    const classFormatted = formatClass(newCard.class, language);

    const newCardFormatted: ICard = {
      id: data.id,
      race: raceFormatted,
      class: classFormatted,
      attributes: newCard.attributes,
      hp: newCard.hp,
      items: newCard.items,
      level: newCard.level,
      name: newCard.name,
      notes: newCard.notes,
      proficiencies: newCard.proficiencies,
    };

    return newCardFormatted;
  },

  delete: async (cardId) => {
    await firestore().collection('cards').doc(cardId).delete();
  },
};

export { serviceCards };
