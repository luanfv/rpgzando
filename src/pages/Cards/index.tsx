import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { useCards } from '../../hooks/CardsContext';

import Content from '../../components/Content';
import ButtonFixed from '../../components/ButtonFixed';

import List from './components/List';
import { Br } from './style';

const Collectors: React.FC = () => {
  const { navigate } = useNavigation();
  const { cards, resetCard } = useCards();

  useEffect(() => {
    resetCard();
  }, [resetCard]);

  return (
    <>
      <Content title="Player">
        {cards.map((_card, _index) => (
          <List
            key={_index}
            id={_card.id}
            level={_card.level}
            name={_card.name}
            profession={_card.profession.name}
            raceId={_card.race.id}
          />
        ))}

        <Br />
      </Content>

      <ButtonFixed onPress={() => navigate('createCard')} />
    </>
  );
};

export default Collectors;
