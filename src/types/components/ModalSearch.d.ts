interface IModalSearch {
  isVisible: boolean;

  onClose: () => void;
  onClean: () => void;
  onSearch: () => void;
}

export { IModalSearch };
