import { TextInputProps } from 'react-native';

interface IInput extends TextInputProps {
  title: string;
  errorMessage?: string;
  reference?: React.Ref<TextInput>;
}

export { IInput };
