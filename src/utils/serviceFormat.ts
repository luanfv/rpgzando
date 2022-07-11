import { IClass, IRace } from '@src/types';
import { IFormatCard, IFormatClass, IFormatRace } from '@src/types/utils';

const formatRace: IFormatRace = (selectedRace, language) => {
  const raceName =
    language === 'pt' ? selectedRace.namePT : selectedRace.nameEN;

  const raceDescription =
    language === 'pt' ? selectedRace.descriptionPT : selectedRace.descriptionEN;

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
    language === 'pt' ? selectedClass.namePT : selectedClass.nameEN;

  const classFormatted: IClass = {
    image: selectedClass.image,
    index: selectedClass.index,
    hp: selectedClass.hp,
    name: className,
  };

  return classFormatted;
};

const formatCard: IFormatCard = (card, language) => {
  const myClass = formatClass(card.class, language);
  const myRace = formatRace(card.race, language);

  return {
    class: myClass,
    race: myRace,

    id: card.id,
    name: card.name,
    hp: card.hp,
    level: card.level,
    notes: card.notes,
    email: card.email,
    attributes: card.attributes,
    skills: card.skills,
    createdAt: card.createdAt,
  };
};

export { formatRace, formatClass, formatCard };
