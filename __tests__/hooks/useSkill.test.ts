import { renderHook } from '@testing-library/react-hooks';

import { useSkill } from '@src/hooks/useSkill';

describe('src/hooks/useSkill', () => {
  describe('calcProficiency', () => {
    const { result } = renderHook(() => useSkill());

    it('Should return 2', () => {
      expect(result.current.calcProficiency(1)).toBe(2);
      expect(result.current.calcProficiency(2)).toBe(2);
      expect(result.current.calcProficiency(3)).toBe(2);
      expect(result.current.calcProficiency(4)).toBe(2);
    });

    it('Should return 3', () => {
      expect(result.current.calcProficiency(5)).toBe(3);
      expect(result.current.calcProficiency(6)).toBe(3);
      expect(result.current.calcProficiency(7)).toBe(3);
      expect(result.current.calcProficiency(8)).toBe(3);
    });

    it('Should return 4', () => {
      expect(result.current.calcProficiency(9)).toBe(4);
      expect(result.current.calcProficiency(10)).toBe(4);
      expect(result.current.calcProficiency(11)).toBe(4);
      expect(result.current.calcProficiency(12)).toBe(4);
    });

    it('Should return 5', () => {
      expect(result.current.calcProficiency(13)).toBe(5);
      expect(result.current.calcProficiency(14)).toBe(5);
      expect(result.current.calcProficiency(15)).toBe(5);
      expect(result.current.calcProficiency(16)).toBe(5);
    });

    it('Should return 6', () => {
      expect(result.current.calcProficiency(17)).toBe(6);
      expect(result.current.calcProficiency(18)).toBe(6);
      expect(result.current.calcProficiency(19)).toBe(6);
      expect(result.current.calcProficiency(20)).toBe(6);
    });
  });

  describe('calcModifier', () => {
    const { result } = renderHook(() => useSkill());

    it('Should return +5', () => {
      expect(result.current.calcModifier(20)).toBe('+5');
    });

    it('Should return +4', () => {
      expect(result.current.calcModifier(18)).toBe('+4');
      expect(result.current.calcModifier(19)).toBe('+4');
    });

    it('Should return +3', () => {
      expect(result.current.calcModifier(16)).toBe('+3');
      expect(result.current.calcModifier(17)).toBe('+3');
    });

    it('Should return +2', () => {
      expect(result.current.calcModifier(14)).toBe('+2');
      expect(result.current.calcModifier(15)).toBe('+2');
    });

    it('Should return +1', () => {
      expect(result.current.calcModifier(12)).toBe('+1');
      expect(result.current.calcModifier(13)).toBe('+1');
    });

    it('Should return +0', () => {
      expect(result.current.calcModifier(10)).toBe('+0');
      expect(result.current.calcModifier(11)).toBe('+0');
    });

    it('Should return -1', () => {
      expect(result.current.calcModifier(8)).toBe('-1');
      expect(result.current.calcModifier(9)).toBe('-1');
    });

    it('Should return -2', () => {
      expect(result.current.calcModifier(6)).toBe('-2');
      expect(result.current.calcModifier(7)).toBe('-2');
    });

    it('Should return -3', () => {
      expect(result.current.calcModifier(4)).toBe('-3');
      expect(result.current.calcModifier(5)).toBe('-3');
    });

    it('Should return -4', () => {
      expect(result.current.calcModifier(2)).toBe('-4');
      expect(result.current.calcModifier(3)).toBe('-4');
    });

    it('Should return -5', () => {
      expect(result.current.calcModifier(1)).toBe('-5');
    });
  });
});
