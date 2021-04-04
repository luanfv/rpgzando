import React from 'react';
import { useNavigation } from '@react-navigation/core';

import { professions, races } from '../../../../utils/rules';
import { Container, Img, Description, Name, Text } from './style';

const List: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <Container onPress={() => navigate('showCard', { id: 'teste' })}>
      <Img source={races[0].image} />
      <Description>
        <Name>Player</Name>
        <Text>{professions[0].name}</Text>
        <Text>Nível: 1</Text>
      </Description>
    </Container>
  );
};

export default List;
