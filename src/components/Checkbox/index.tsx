import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from 'styled-components';

import { Container, Text } from './styles';
import { ICheckbox } from '@src/types/components';

const Checkbox: React.FC<ICheckbox> = ({ checked, description, onChange }) => {
  const theme = useTheme();

  return (
    <Container selected={checked} onPress={onChange} activeOpacity={1}>
      <Text selected={checked}>{description}</Text>

      <CheckBox
        value={Boolean(checked)}
        onChange={onChange}
        tintColors={{ true: theme.colors.secondary, false: theme.colors.text }}
      />
    </Container>
  );
};

export { Checkbox };
