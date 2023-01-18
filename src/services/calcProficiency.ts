type CalcProficiencyOutput = 6 | 5 | 4 | 3 | 2;

function calcProficiency(level: number): CalcProficiencyOutput {
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

export {calcProficiency};
