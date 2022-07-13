import React from 'react';

import { ICard } from '@src/types/components';
import { Container, Content, Description, Image, Title } from './styles';

const Card: React.FC<ICard> = ({ item, onPress }) => {
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
