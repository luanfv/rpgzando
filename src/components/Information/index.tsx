import React from 'react';

import { Container, Title, Value } from './styles';

interface IInformation {
  title: string;
  value: string;
  width?: number;
}

const Information: React.FC<IInformation> = ({ title, value, width }) => {
  return (
    <Container w={width}>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Container>
  );
};

export { Information };
