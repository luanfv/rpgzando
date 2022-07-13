import { ICard } from '@src/types';
import React from 'react';

import { Container, Content, Description, Image, Title } from './styles';

interface ICardComponent {
  item: ICard;
  onPress: () => void;
}

const Card: React.FC<ICardComponent> = ({ item, onPress }) => {
  return (
    <Container activeOpacity={0.8} onPress={onPress}>
      <Image source={{ uri: item.race.image }} />

      <Content>
        <Title>{item.name}</Title>

        <Description>{item.class.name}</Description>
      </Content>
    </Container>
  );
};

export { Card };
