import React from 'react';

import { Container, Title, Value } from './styles';

interface IInformation {
  title: string;
  value: string;
}

const Information: React.FC<IInformation> = ({ title, value }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Container>
  );
};

export { Information };
