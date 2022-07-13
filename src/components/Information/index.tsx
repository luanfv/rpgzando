import React from 'react';

import { IInformation } from '@src/types/components';
import { Container, Title, Value } from './styles';

const Information: React.FC<IInformation> = ({ title, value }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </Container>
  );
};

export { Information };
