import firestore from '@react-native-firebase/firestore';

import { ICard } from '@src/types';
import { IServiceCard, IServiceCards } from '@src/types/services';
import { serviceClasses, serviceRaces } from '@src/services';
import { formatCard, formatClass, formatRace } from '@src/utils/serviceFormat';

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
    const attributes = {
      for: cardForm.for,
      dex: cardForm.dex,
      con: cardForm.con,
      int: cardForm.int,
      wis: cardForm.wis,
      cha: cardForm.cha,
    };

    await firestore().collection('cards').doc(cardId).update({
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

    const raceFormatted = formatRace(raceSelected, language);
    const classFormatted = formatClass(classSelected, language);

    const cardFormatted: ICard = {
      id: cardId,

      race: raceFormatted,
      class: classFormatted,

      attributes,

      name: cardForm.name,
      hp: cardForm.hp,
      level: cardForm.level,
      items: cardForm.items,
      notes: cardForm.notes,
      proficiencies: cardForm.proficiencies,
    };

    return cardFormatted;
  },

  getOthers: async (language = 'en', userUid, filter) => {
    const cards: ICard[] = [];
    const response = await firestore()
      .collection('cards')
      .where('userUid', '!=', userUid)
      .get();

    response.docs.forEach((doc) => {
      const data = doc.data() as IServiceCard;

      if (filter) {
        if (!!filter.class && filter.class !== data.class.index) {
          return;
        }

        if (!!filter.race && filter.race !== data.race.index) {
          return;
        }
      }

      const myClass = formatClass(data.class, language);
      const myRace = formatRace(data.race, language);

      cards.push({
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
      });
    });

    return cards;
  },
};

export { serviceCards };
