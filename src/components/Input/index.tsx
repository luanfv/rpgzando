import { IInput } from '@src/types/components';
import React from 'react';
import { useTheme } from 'styled-components/native';
import { Container, Message } from './styles';

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
