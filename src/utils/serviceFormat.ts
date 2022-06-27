import { ICard, IClass, IRace } from '@src/types';
import { IFormatCard, IFormatClass, IFormatRace } from '@src/types/utils';

const formatRace: IFormatRace = (selectedRace, language) => {
  const raceName =
    language === 'en' ? selectedRace.nameEN : selectedRace.namePT;

  const raceDescription =
    language === 'en' ? selectedRace.descriptionEN : selectedRace.descriptionPT;

  const raceFormatted: IRace = {
    image: selectedRace.image,
    index: selectedRace.index,
    race: selectedRace.race,
    description: raceDescription,
    name: raceName,
  };

  return raceFormatted;
};

const formatClass: IFormatClass = (selectedClass, language) => {
  const className =
    language === 'en' ? selectedClass.nameEN : selectedClass.namePT;

  const classFormatted: IClass = {
    image: selectedClass.image,
    index: selectedClass.index,
    hp: selectedClass.hp,
    name: className,
  };

  return classFormatted;
};

const formatCard: IFormatCard = (cardId, selectedCard, language) => {
  const raceFormatted = formatRace(selectedCard.race, language);
  const classFormatted = formatClass(selectedCard.class, language);
  const attributes = {
    for: selectedCard.for,
    dex: selectedCard.dex,
    con: selectedCard.con,
    int: selectedCard.int,
    wis: selectedCard.wis,
    cha: selectedCard.cha,
  };

  const cardFormatted: ICard = {
    id: cardId,

    race: raceFormatted,
    class: classFormatted,

    attributes,

    name: selectedCard.name,
    hp: selectedCard.hp,
    level: selectedCard.level,
    items: selectedCard.items,
    notes: selectedCard.notes,
    proficiencies: selectedCard.proficiencies,
  };

  return cardFormatted;
};

export { formatRace, formatClass, formatCard };
