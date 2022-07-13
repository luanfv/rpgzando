import React, { ReactNode } from 'react';

import { Container, Item, Title } from './styles';

interface IColumn2X {
  title: string;
  items: ReactNode[];
}

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
