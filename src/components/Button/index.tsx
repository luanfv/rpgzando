import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Text } from './style';

interface IButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
}

const Button: React.FC<IButtonProps> = ({ title, icon, onPress }) => {
  return (
    <View onTouchEnd={onPress}>
      <Container icon={!!icon}>
        <Text>{title}</Text>
        {!!icon && <Icon name={icon} size={24} color="#fff" />}
      </Container>
    </View>
  );
};

export default Button;
