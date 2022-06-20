import { useCallback } from 'react';

const useSkill = () => {
  const calcProficiency = useCallback((level: number): number => {
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

  return { calcProficiency };
};

export { useSkill };
