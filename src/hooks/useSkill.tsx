import { useCallback } from 'react';

const useSkill = () => {
  const calcProficiency = useCallback((level: number) => {
    if (level < 5) {
      return 2;
    }

    if (level < 9) {
      return 3;
    }

    if (level < 13) {
      return 4;
    }

    if (level < 17) {
      return 5;
    }

    return 6;
  }, []);

  const calcModifier = useCallback((modifier: number) => {
    const value = (modifier - 10) / 2;

    if (value >= 0) {
      return `+${Math.trunc(value)}`;
    }

    return `${value.toFixed(0)}`;
  }, []);

  return { calcProficiency, calcModifier };
};

export { useSkill };
