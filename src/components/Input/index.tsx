import React from 'react';

import { Container, Title, InputChange } from './style';

const Input: React.FC<any> = ({ title, ...rest }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <InputChange {...rest} />
    </Container>
  );
};

export default Input;
