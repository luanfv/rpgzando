import React from 'react';
import { ScrollView } from 'react-native';

import Header from '../Header';
import { Body, Main } from './style';

interface IProps {
  title: String;
  goBack?: Boolean;
  card?: Boolean;
  idCard?: String;
}

const Content: React.FC<IProps> = ({
  children,
  title,
  goBack,
  card,
  idCard,
}) => {
  return (
    <Body>
      <Header title={title} goBack={goBack} card={card} idCard={idCard} />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Main>{children}</Main>
      </ScrollView>
    </Body>
  );
};

export default Content;
