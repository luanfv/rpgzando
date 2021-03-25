import React from 'react';

import Content from '../../components/Content';
import ProgressBar from '../../components/ProgressBar';
import Input from '../../components/Input';

import { Main, Container } from './style';

const CreateCard: React.FC = () => {
  return (
    <Content title="Nova Ficha" goBack>
      <Main>
        <ProgressBar phase={1} />

        <Container>
          <Input title="Nome" />
          <Input title="Nível" keyboardType="numeric" />
        </Container>
      </Main>
    </Content>
  );
};

export default CreateCard;
