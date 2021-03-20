import React from 'react';
import { Text } from 'react-native';

import Content from '../../components/Content';

const About: React.FC = () => {
  return (
    <Content title="Sobre" goBack>
      <Text>Sobre</Text>
    </Content>
  );
};

export default About;
