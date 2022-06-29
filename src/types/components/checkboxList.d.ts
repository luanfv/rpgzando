interface ICheckboxListItem {
  index: string;
  name: string;
}

interface ICheckboxList {
  title: string;
  item: ICheckboxListItem[];
  isCheckedCheckbox: (index: string) => boolean;
  handleToggleCheckbox: (index: string) => void;
}

export { ICheckboxList, ICheckboxListItem };
