import React from 'react';

import { IColumn2X } from '@src/types/components';
import { Container, Item, Title } from './styles';

const Column2X: React.FC<IColumn2X> = ({ title, items }) => {
  return (
    <>
      <Title>{title}</Title>

      <Container>
        {items.map((value, index) => (
          <Item key={index}>{value}</Item>
        ))}
      </Container>
    </>
  );
};

export { Column2X };
