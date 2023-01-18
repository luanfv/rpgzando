import {calcProficiency} from './calcProficiency';

describe('calcProficiency', () => {
  describe('WHEN receive a level less than 5', () => {
    it.each`
      level
      ${0}
      ${1}
      ${2}
      ${3}
      ${4}
    `('SHOULD return the value 2 (LEVEL = $level)', ({level}) => {
      expect(calcProficiency(level)).toEqual(2);
    });
  });

  describe('WHEN receive a level greater than 4 and less than 9', () => {
    it.each`
      level
      ${5}
      ${6}
      ${7}
      ${8}
    `('SHOULD return the value 3 (LEVEL = $level)', ({level}) => {
      expect(calcProficiency(level)).toEqual(3);
    });
  });

  describe('WHEN receive a level greater than 8 and less than 13', () => {
    it.each`
      level
      ${9}
      ${10}
      ${11}
      ${12}
    `('SHOULD return the value 4 (LEVEL = $level)', ({level}) => {
      expect(calcProficiency(level)).toEqual(4);
    });
  });

  describe('WHEN receive a level greater than 12 and less than 16', () => {
    it.each`
      level
      ${13}
      ${14}
      ${15}
      ${16}
    `('SHOULD return the value 5 (LEVEL = $level)', ({level}) => {
      expect(calcProficiency(level)).toEqual(5);
    });
  });

  describe('WHEN receive a level greater than 16', () => {
    it.each`
      level
      ${17}
      ${18}
      ${19}
      ${20}
      ${21}
    `('SHOULD return the value 6 (LEVEL = $level)', ({level}) => {
      expect(calcProficiency(level)).toEqual(6);
    });
  });
});
