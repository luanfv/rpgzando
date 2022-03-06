import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { useCards } from '../../hooks/CardsContext';
import { useApp } from '../../hooks/AppContext';

import Content from '../../components/Content';
import ButtonFixed from '../../components/ButtonFixed';

import List from './components/List';
import { Br } from './style';

const Collectors: React.FC = () => {
  const { navigate } = useNavigation();
  const { cards, resetCard } = useCards();
  const { username } = useApp();

  useEffect(() => {
    resetCard();
  }, [resetCard]);

  return (
    <>
      <Content title={username}>
        {cards.map((card, index) => (
          <List
            key={index}
            id={card.id}
            level={card.level}
            name={card.name}
            profession={card.profession.name}
            raceId={card.race.id}
          />
        ))}

        <Br />
      </Content>

      <ButtonFixed onPress={() => navigate('createCard')} />
    </>
  );
};

export default Collectors;
