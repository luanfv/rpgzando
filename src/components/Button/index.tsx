import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Text } from './style';

interface IProps {
  title: String;
  icon?: String;
  onPress: () => void;
}

const Button: React.FC<IProps> = ({ title, icon, onPress }) => {
  return (
    <Container onPress={onPress} icon={!!icon}>
      <Text>{title}</Text>
      {!!icon && <Icon name={String(icon)} size={24} color="#fff" />}
    </Container>
  );
};

export default Button;
