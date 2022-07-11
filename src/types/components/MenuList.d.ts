interface IMenuItemSettings {
  icon: string;
  title: string;
  message: string;
}

interface IMenuItem {
  isMain?: boolean;
  settings: IMenuItemSettings;
  onPress: () => void;
}

interface IMenuList {
  items: IMenuItem[];
}

export { IMenuList, IMenuItem };
