import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/core';

import { races } from '../../../../utils/rules';

import { Container, Img, Description, Name, Text } from './style';

interface IProps {
  id: String;
  name: String;
  profession: String;
  level: Number;
  raceId: Number;
}

const List: React.FC<IProps> = ({ id, name, profession, level, raceId }) => {
  const { navigate } = useNavigation();
  const race = useMemo(() => races.find((_race) => _race.id === raceId), [
    raceId,
  ]);

  return (
    <Container onPress={() => navigate('showCard', { id })}>
      {race?.image && <Img source={race?.image} />}
      <Description>
        <Name>{name}</Name>
        <Text>{profession}</Text>
        <Text>Nível: {level}</Text>
      </Description>
    </Container>
  );
};

export default List;
