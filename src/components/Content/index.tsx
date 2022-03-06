import React from 'react';
import { ScrollView } from 'react-native';

import Header from '../Header';
import { Body, Main } from './style';

interface IContentProps {
  title: string;
  goBack?: boolean;
  card?: boolean;
  idCard?: string;
}

const Content: React.FC<IContentProps> = ({
  children,
  title,
  goBack,
  idCard,
}) => {
  return (
    <Body>
      <Header title={title} goBack={goBack} idCard={idCard} />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Main>{children}</Main>
      </ScrollView>
    </Body>
  );
};

export default Content;
