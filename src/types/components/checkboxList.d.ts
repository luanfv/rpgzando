interface ISkillList {
  index: string;
  choose: number;

  data: {
    index: string;
    name: string;
  }[];
}

interface ICheckboxList {
  title: string;
  skills: ISkillList;
  isCheckedCheckbox: (index: string) => boolean;
  handleToggleCheckbox: (index: string) => void;
}

export { ICheckboxList, ISkillList };
