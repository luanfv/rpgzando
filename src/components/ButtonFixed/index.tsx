import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Button } from './style';

interface Props {
  onPress: () => void;
}

const ButtonFixed: React.FC<Props> = ({ onPress }) => {
  return (
    <Container>
      <Button onPress={onPress}>
        <Icon name="plus" color="#fff" size={36} />
      </Button>
    </Container>
  );
};

export default ButtonFixed;
