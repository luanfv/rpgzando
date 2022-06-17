import React from 'react';
import CheckBox from '@react-native-community/checkbox';

import { Container, Text } from './styles';

interface ICheckbox {
  checked: boolean;
  description: string;
  onChange: () => void;
}

const Checkbox: React.FC<ICheckbox> = ({ checked, description, onChange }) => {
  return (
    <Container selected={checked}>
      <Text>{description}</Text>

      <CheckBox value={Boolean(checked)} onChange={onChange} />
    </Container>
  );
};

export { Checkbox };
