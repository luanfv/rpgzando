import { PickerProps } from '@react-native-picker/picker';

interface IPickerItem {
  label: string;
  value: string;
  description?: string;
  image?: string;
}

interface IPicker extends PickerProps {
  items: IPickerItem[];
  title: string;
}

export { IPicker, IPickerItem };
