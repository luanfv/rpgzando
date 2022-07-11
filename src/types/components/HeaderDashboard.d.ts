import { IMenuItem } from '@src/@types/components';

interface IHeaderDashboard {
  text1: string;
  text2: string;
  menuItems: IMenuItem[];
  onSignOut: () => void;
}

export { IHeaderDashboard };
