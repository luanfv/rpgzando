import React from 'react';
import { ScrollView } from 'react-native';
import { Container } from './styles';

const Body: React.FC = ({ children }) => {
  return (
    <Container>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </Container>
  );
};

export { Body };
