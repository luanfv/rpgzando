interface IHeaderItem {
  label: string;
  onPress: () => void;
}

interface IHeader {
  onBack: () => void;

  options?: IHeaderItem[];
}

export { IHeader, IHeaderItem };
