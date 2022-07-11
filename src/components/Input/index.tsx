import { IInput } from '@src/types/components';
import React from 'react';
import { useTheme } from 'styled-components/native';
import { Container, Message, Title } from './styles';

const Input: React.FC<IInput> = ({
  title,
  errorMessage,
  reference,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <>
      <Title>{title}</Title>

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
