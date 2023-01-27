import {SkillCalculation} from './SkillCalculation';

describe('SkillCalculation.modifier', () => {
  describe.each`
    attribute | expected
    ${0}      | ${'-5'}
    ${1}      | ${'-5'}
    ${2}      | ${'-4'}
    ${3}      | ${'-4'}
    ${4}      | ${'-3'}
    ${5}      | ${'-3'}
    ${6}      | ${'-2'}
    ${7}      | ${'-2'}
    ${8}      | ${'-1'}
    ${9}      | ${'-1'}
    ${10}     | ${'+0'}
    ${11}     | ${'+0'}
    ${12}     | ${'+1'}
    ${13}     | ${'+1'}
    ${14}     | ${'+2'}
    ${15}     | ${'+2'}
    ${16}     | ${'+3'}
    ${17}     | ${'+3'}
    ${18}     | ${'+4'}
    ${19}     | ${'+4'}
    ${20}     | ${'+5'}
    ${21}     | ${'+5'}
    ${22}     | ${'+6'}
    ${23}     | ${'+6'}
    ${24}     | ${'+7'}
    ${25}     | ${'+7'}
    ${26}     | ${'+8'}
    ${27}     | ${'+8'}
    ${28}     | ${'+9'}
    ${29}     | ${'+9'}
    ${30}     | ${'+10'}
  `('WHEN receive the attribute = $attribute', ({attribute, expected}) => {
    it(`SHOULD return the modifier = ${expected}`, () => {
      expect(SkillCalculation.modifier(attribute)).toEqual(expected);
    });
  });
});

describe('SkillCalculation.proficiency', () => {
  describe('WHEN receive the level less than 5', () => {
    it.each`
      level
      ${0}
      ${1}
      ${2}
      ${3}
      ${4}
    `('SHOULD return the proficiency = 2', ({level}) => {
      expect(SkillCalculation.proficiency(level)).toEqual(2);
    });
  });

  describe('WHEN receive the level greater than 4 and less than 9', () => {
    it.each`
      level
      ${5}
      ${6}
      ${7}
      ${8}
    `('SHOULD return the proficiency = 3', ({level}) => {
      expect(SkillCalculation.proficiency(level)).toEqual(3);
    });
  });

  describe('WHEN receive the level greater than 8 and less than 13', () => {
    it.each`
      level
      ${9}
      ${10}
      ${11}
      ${12}
    `('SHOULD return the proficiency = 4', ({level}) => {
      expect(SkillCalculation.proficiency(level)).toEqual(4);
    });
  });

  describe('WHEN receive the level greater than 12 and less than 16', () => {
    it.each`
      level
      ${13}
      ${14}
      ${15}
      ${16}
    `('SHOULD return the proficiency = 5', ({level}) => {
      expect(SkillCalculation.proficiency(level)).toEqual(5);
    });
  });

  describe('WHEN receive the level greater than 16', () => {
    it.each`
      level
      ${17}
      ${18}
      ${19}
      ${20}
      ${21}
    `('SHOULD return the proficiency = 6', ({level}) => {
      expect(SkillCalculation.proficiency(level)).toEqual(6);
    });
  });
});
