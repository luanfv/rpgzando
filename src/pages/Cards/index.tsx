import React from 'react';
import { Text } from 'react-native';

import Content from '../../components/Content';
import ButtonFixed from '../../components/ButtonFixed';

import { Br } from './style';

const Collectors: React.FC = () => {
  return (
    <Content title="Player">
      <Text>Lista de personagens!</Text>

      <Br />

      <ButtonFixed onPress={() => console.log('botão apertado')} />
    </Content>
  );
};

export default Collectors;
