import { IClass, IRace } from '@src/types';
import { IFormatClass, IFormatRace } from '@src/types/utils';

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

export { formatRace, formatClass };
