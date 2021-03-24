import React from 'react';
import { useNavigation } from '@react-navigation/core';

import Content from '../../components/Content';
import ButtonFixed from '../../components/ButtonFixed';

import Card from './Card';
import { Br } from './style';

const Collectors: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <Content title="Player">
        <Card />

        <Br />
      </Content>

      <ButtonFixed onPress={() => navigate('createCard')} />
    </>
  );
};

export default Collectors;
