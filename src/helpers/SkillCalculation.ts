class SkillCalculation {
  static modifier(attribute: number): string {
    const value = (attribute - 10) / 2;

    if (value >= 0) {
      return `+${Math.trunc(value)}`;
    }

    return `${value.toFixed(0)}`;
  }

  static proficiency(level: number): number {
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
  }
}

export {SkillCalculation};
