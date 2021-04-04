import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { useCards } from '../../../hooks/CardsContext';

import Content from '../../../components/Content';
import ProgressBar from '../../../components/ProgressBar';

import { Main } from './style';

interface IRouteParams {
  id: String;
  newCard?: Boolean;
}

const Show: React.FC = () => {
  const { findCard } = useCards();
  const { params } = useRoute();

  const routeParams = params as IRouteParams;

  const card = useMemo(() => findCard(routeParams.id), [findCard, routeParams]);

  return (
    <Content title="Ficha" goBack>
      <Main>
        {!!routeParams.newCard && <ProgressBar phase={3} />}

        <View>
          <Text>{card?.name}</Text>
        </View>
      </Main>
    </Content>
  );
};

export default Show;
