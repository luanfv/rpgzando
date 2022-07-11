import firestore from '@react-native-firebase/firestore';

import { ICard, ICardService, IAttributes, ISkills } from '@src/types';
import { IQueryGetOthers, IServiceCards } from '@src/types/services';
import { serviceClasses, serviceRaces } from '@src/services';
import { formatCard } from '@src/utils/serviceFormat';

const queryGetOthers: IQueryGetOthers = async (filter, lastDoc) => {
  if (filter) {
    const hasEmail = !!filter.email;
    const hasClass = !!filter.class;
    const hasRace = !!filter.race;

    if (hasEmail) {
      if (hasClass) {
        if (hasRace) {
          return lastDoc
            ? await firestore()
                .collection('cards')
                .where('email', '==', filter.email)
                .where('class.index', '==', filter.class)
                .where('race.index', '==', filter.race)
                .orderBy('createdAt', 'desc')
                .startAfter(lastDoc)
                .limit(20)
                .get()
            : await firestore()
                .collection('cards')
                .where('email', '==', filter.email)
                .where('class.index', '==', filter.class)
                .where('race.index', '==', filter.race)
                .orderBy('createdAt', 'desc')
                .limit(20)
                .get();
        }

        return lastDoc
          ? await firestore()
              .collection('cards')
              .where('email', '==', filter.email)
              .where('class.index', '==', filter.class)
              .orderBy('createdAt', 'desc')
              .startAfter(lastDoc)
              .limit(20)
              .get()
          : await firestore()
              .collection('cards')
              .where('email', '==', filter.email)
              .where('class.index', '==', filter.class)
              .orderBy('createdAt', 'desc')
              .limit(20)
              .get();
      }

      if (hasRace) {
        return lastDoc
          ? firestore()
              .collection('cards')
              .where('email', '==', filter.email)
              .where('race.index', '==', filter.race)
              .orderBy('createdAt', 'desc')
              .startAfter(lastDoc)
              .limit(20)
              .get()
          : await firestore()
              .collection('cards')
              .where('email', '==', filter.email)
              .where('race.index', '==', filter.race)
              .orderBy('createdAt', 'desc')
              .limit(20)
              .get();
      }

      return lastDoc
        ? await firestore()
            .collection('cards')
            .where('email', '==', filter.email)
            .orderBy('createdAt', 'desc')
            .startAfter(lastDoc)
            .limit(20)
            .get()
        : await firestore()
            .collection('cards')
            .where('email', '==', filter.email)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();
    }

    if (hasClass) {
      if (hasRace) {
        return lastDoc
          ? await firestore()
              .collection('cards')
              .where('class.index', '==', filter.class)
              .where('race.index', '==', filter.race)
              .orderBy('createdAt', 'desc')
              .startAfter(lastDoc)
              .limit(20)
              .get()
          : await firestore()
              .collection('cards')
              .where('class.index', '==', filter.class)
              .where('race.index', '==', filter.race)
              .orderBy('createdAt', 'desc')
              .limit(20)
              .get();
      }

      return lastDoc
        ? await firestore()
            .collection('cards')
            .where('class.index', '==', filter.class)
            .orderBy('createdAt', 'desc')
            .startAfter(lastDoc)
            .limit(20)
            .get()
        : await firestore()
            .collection('cards')
            .where('class.index', '==', filter.class)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();
    }

    if (hasRace) {
      return lastDoc
        ? await firestore()
            .collection('cards')
            .where('race.index', '==', filter.race)
            .orderBy('createdAt', 'desc')
            .startAfter(lastDoc)
            .limit(20)
            .get()
        : await firestore()
            .collection('cards')
            .where('race.index', '==', filter.race)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();
    }
  }

  return lastDoc
    ? await firestore()
        .collection('cards')
        .orderBy('createdAt', 'desc')
        .startAfter(lastDoc)
        .limit(20)
        .get()
    : await firestore()
        .collection('cards')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();
};

const serviceCards: IServiceCards = {
  get: async (userUid, language = 'en') => {
    const response = await firestore()
      .collection('cards')
      .where('userUid', '==', userUid)
      .orderBy('createdAt', 'desc')
      .get();

    const cards: ICard[] = response.docs.map((doc) => {
      const data = doc.data() as ICardService;

      return formatCard({ ...data, id: doc.id }, language);
    });

    return cards;
  },

  post: async (cardForm, language = 'en') => {
    const myCards = await firestore()
      .collection('cards')
      .where('userUid', '==', cardForm.userUid)
      .orderBy('createdAt', 'desc')
      .get();

    if (myCards.docs.length > 5) {
      throw Error('Only 5 cards are allowed');
    }

    const raceSelected = await serviceRaces.find(cardForm.race);
    const classSelected = await serviceClasses.find(cardForm.class);

    const createdAt = firestore.FieldValue.serverTimestamp();
    const attributes: IAttributes = {
      for: cardForm.for,
      dex: cardForm.dex,
      con: cardForm.con,
      int: cardForm.int,
      wis: cardForm.wis,
      cha: cardForm.cha,
    };
    const skills: ISkills = {
      acrobatics: cardForm.acrobatics,
      animalHandling: cardForm.animalHandling,
      arcana: cardForm.arcana,
      athletics: cardForm.athletics,
      deception: cardForm.deception,
      history: cardForm.history,
      insight: cardForm.insight,
      intimidation: cardForm.intimidation,
      investigation: cardForm.investigation,
      medicine: cardForm.medicine,
      nature: cardForm.nature,
      perception: cardForm.perception,
      performance: cardForm.performance,
      persuasion: cardForm.persuasion,
      religion: cardForm.religion,
      sleight: cardForm.sleight,
      stealth: cardForm.stealth,
      survival: cardForm.survival,
    };

    const newCard: ICardService = {
      createdAt,
      attributes,
      skills,

      race: raceSelected,
      class: classSelected,

      userUid: cardForm.userUid,
      name: cardForm.name,
      hp: cardForm.hp,
      level: cardForm.level,
      notes: cardForm.notes,
      email: cardForm.email,
    };

    const data = await firestore().collection('cards').add(newCard);

    const response = await firestore().collection('cards').doc(data.id).get();
    const card = response.data() as ICardService;

    return formatCard({ ...card, id: data.id }, language);
  },

  delete: async (userUid, cardId) => {
    const response = await firestore().collection('cards').doc(cardId).get();
    const card = response.data() as ICardService;

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
    const card = response.data() as ICardService;

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
      notes: cardForm.notes,
    });

    const updatedResponse = await firestore()
      .collection('cards')
      .doc(cardForm.id)
      .get();
    const updatedCard = updatedResponse.data() as ICardService;

    return formatCard({ ...updatedCard, id: updatedResponse.id }, language);
  },

  getOthers: async (language = 'en', filter, lastDoc) => {
    const response = await queryGetOthers(filter, lastDoc);

    if (lastDoc && lastDoc.id === response.docs[response.docs.length - 1].id) {
      throw Error('Has no more items to list.');
    }

    const cards: ICard[] = response.docs.map((doc) => {
      const data = doc.data() as ICardService;

      return formatCard({ ...data, id: doc.id }, language);
    });

    return {
      cards,
      lastDoc: response.docs[response.docs.length - 1],
    };
  },
};

export { serviceCards };
