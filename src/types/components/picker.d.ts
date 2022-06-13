import { PickerProps } from '@react-native-picker/picker';

interface IPickerItem {
  label: string;
  value: string;
}

interface IPicker extends PickerProps {
  items: IPickerItem[];
}

export { IPicker, IPickerItem };
