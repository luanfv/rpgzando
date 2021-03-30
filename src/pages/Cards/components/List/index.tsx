import React from 'react';

import { professions, races } from '../../../../utils/rules';
import { Container, Img, Description, Name, Text } from './style';

const List: React.FC = () => {
  return (
    <Container>
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
