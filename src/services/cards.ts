import firestore from '@react-native-firebase/firestore';

import { ICardForm } from '@src/types';
import { serviceClasses, serviceRaces } from '@src/services';

const serviceCards = {
  get: async () => {},

  post: async (userUid: string, card: ICardForm) => {
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

    const newCard = {
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

    return newCard;
  },
};

export { serviceCards };
