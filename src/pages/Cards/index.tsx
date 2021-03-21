import React from 'react';

import Content from '../../components/Content';
import ButtonFixed from '../../components/ButtonFixed';

import Card from './Card';
import { Br } from './style';

const Collectors: React.FC = () => {
  return (
    <>
      <Content title="Player">
        <Card />

        <Br />
      </Content>

      <ButtonFixed onPress={() => console.log('botão apertado')} />
    </>
  );
};

export default Collectors;
