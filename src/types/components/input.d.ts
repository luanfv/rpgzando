import { TextInputProps } from 'react-native';

interface IInput extends TextInputProps {
  errorMessage?: string;
  reference?: React.Ref<TextInput>;
}

export { IInput };
