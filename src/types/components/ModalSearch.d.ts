interface IModalSearch {
  isVisible: boolean;
  back: string;
  clean: string;
  search: string;

  onClose: () => void;
  onClean: () => void;
  onSearch: () => void;
}

export { IModalSearch };
