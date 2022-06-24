interface IMenuItem {
  isMain?: boolean;
  type: 'create' | 'view';
  onPress: () => void;
}

interface IMenuList {
  items: IMenuItem[];
}

export { IMenuList, IMenuItem };
