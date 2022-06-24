import firestore from '@react-native-firebase/firestore';

import { ICard, IClass, IRace } from '@src/types';
import { IServiceCard, IServiceCards } from '@src/types/services';
import { serviceClasses, serviceRaces } from '@src/services';

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

      const myClass: IClass =
        language === 'en'
          ? {
              hp: data.class.hp,
              image: data.class.image,
              index: data.class.index,
              name: data.class.nameEN,
            }
          : {
              hp: data.class.hp,
              image: data.class.image,
              index: data.class.index,
              name: data.class.namePT,
            };

      const myRace: IRace =
        language === 'en'
          ? {
              description: data.race.descriptionEN,
              image: data.race.image,
              index: data.race.index,
              name: data.race.nameEN,
              race: data.race.race,
            }
          : {
              description: data.race.descriptionPT,
              image: data.race.image,
              index: data.race.index,
              name: data.race.namePT,
              race: data.race.race,
            };

      return {
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

    await firestore().collection('cards').add(newCard);

    const raceName =
      language === 'en' ? newCard.race.nameEN : newCard.race.namePT;

    const raceDescription =
      language === 'en'
        ? newCard.race.descriptionEN
        : newCard.race.descriptionPT;

    const raceFormatted: IRace = {
      image: newCard.race.image,
      index: newCard.race.index,
      race: newCard.race.race,
      description: raceDescription,
      name: raceName,
    };

    const className =
      language === 'en' ? newCard.class.nameEN : newCard.class.namePT;

    const classFormatted: IClass = {
      image: newCard.class.image,
      index: newCard.class.index,
      hp: newCard.class.hp,
      name: className,
    };

    const newCardFormatted: ICard = {
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
};

export { serviceCards };
