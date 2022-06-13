import React from 'react';
import { Text, TextInput, TextInputProps } from 'react-native';
import { Container } from './styles';

interface IInput extends TextInputProps {
  errorMessage?: string;
  reference?: React.Ref<TextInput>;
}

const Input: React.FC<IInput> = ({ errorMessage, reference, ...rest }) => {
  return (
    <>
      <Container {...rest} ref={reference} />
      {errorMessage && <Text>{errorMessage}</Text>}
    </>
  );
};

export { Input };
