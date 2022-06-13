import React from 'react';
import { useTheme } from 'styled-components/native';
import { Picker as PickerRN } from '@react-native-picker/picker';

import { IPicker } from '@src/types/components';
import { Container } from './styles';

const Picker: React.FC<IPicker> = ({ items, ...rest }) => {
  const theme = useTheme();

  return (
    <Container>
      <PickerRN {...rest} style={{ color: theme.colors.text }}>
        {items.map(({ label, value }, index) => (
          <PickerRN.Item
            key={index}
            label={label}
            value={value}
            color={theme.colors.primary}
            style={{ fontSize: theme.fonts.medium }}
          />
        ))}
      </PickerRN>
    </Container>
  );
};

export { Picker };
