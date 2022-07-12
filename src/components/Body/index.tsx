import React from 'react';
import { BottomSpace } from '../styles';
import { Container, Scroll } from './styles';

const Body: React.FC = ({ children }) => {
  return (
    <>
      <Scroll
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Container>{children}</Container>
      </Scroll>

      <BottomSpace />
    </>
  );
};

export { Body };
