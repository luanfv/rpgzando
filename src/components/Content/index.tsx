import React from 'react';
import { ScrollView } from 'react-native';

import Header from '../Header';
import { Body, Main } from './style';

interface IProps {
  title: String;
  goBack?: Boolean;
}

const Content: React.FC<IProps> = ({ children, title, goBack }) => {
  return (
    <Body>
      <Header title={title} goBack={goBack} />

      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Main>{children}</Main>
      </ScrollView>
    </Body>
  );
};

export default Content;
