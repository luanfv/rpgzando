import React from 'react';

import Content from '../../components/Content';
import ProgressBar from '../../components/ProgressBar';

import { Main } from './style';

const CreateCard: React.FC = () => {
  return (
    <Content title="Nova Ficha" goBack>
      <Main>
        <ProgressBar phase={1} />
      </Main>
    </Content>
  );
};

export default CreateCard;
