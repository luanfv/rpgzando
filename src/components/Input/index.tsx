import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Container, Message } from './styles';

interface IInput extends TextInputProps {
  errorMessage?: string;
  reference?: React.Ref<TextInput>;
}

const Input: React.FC<IInput> = ({ errorMessage, reference, ...rest }) => {
  const theme = useTheme();

  return (
    <>
      <Container
        ref={reference}
        hasError={!!errorMessage}
        placeholderTextColor={theme.colors.textLight}
        {...rest}
      />
      <Message>{errorMessage}</Message>
    </>
  );
};

export { Input };
