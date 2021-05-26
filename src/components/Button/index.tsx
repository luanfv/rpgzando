import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Text } from './style';

interface IProps {
  title: String;
  icon?: String;
  onPress: () => void;
}

const Button: React.FC<IProps> = ({ title, icon, onPress }) => {
  return (
    <View onTouchEnd={onPress}>
      <Container icon={!!icon}>
        <Text>{title}</Text>
        {!!icon && <Icon name={String(icon)} size={24} color="#fff" />}
      </Container>
    </View>
  );
};

export default Button;
