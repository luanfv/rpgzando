import React from 'react';
import { useRoute } from '@react-navigation/native';

import Content from '../../../components/Content';
import ProgressBar from '../../../components/ProgressBar';

import { Main } from './style';

interface IRouteParams {
  id: String;
  newCard?: Boolean;
}

const Show: React.FC = () => {
  const { params } = useRoute();
  const routeParams = params as IRouteParams;

  return (
    <Content title="Ficha" goBack>
      <Main>{!!routeParams.newCard && <ProgressBar phase={3} />}</Main>
    </Content>
  );
};

export default Show;
