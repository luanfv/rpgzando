import React, { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { Picker as PickerRN } from '@react-native-picker/picker';

import { IPicker } from '@src/types/components';
import {
  Container,
  Description,
  Picture,
  PictureVoid,
  Select,
  Title,
} from './styles';

const Picker: React.FC<IPicker> = ({
  items,
  selectedValue,
  title,
  ...rest
}) => {
  const theme = useTheme();

  const selectedItem = useMemo(
    () => items.find((item) => item.value === selectedValue),
    [items, selectedValue],
  );

  return (
    <Container>
      <Title>{title}</Title>

      {selectedItem && !!selectedItem.image ? (
        <Picture
          source={{
            uri: selectedItem.image,
          }}
        />
      ) : (
        <PictureVoid
          name="close"
          size={theme.spacing * 3}
          color={theme.colors.attention}
        />
      )}

      <Select>
        <PickerRN
          {...rest}
          style={{ color: theme.colors.text }}
          dropdownIconColor={theme.colors.text}
          selectedValue={selectedValue}
        >
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
      </Select>

      {selectedItem && !!selectedItem.description && (
        <Description>{selectedItem.description}</Description>
      )}
    </Container>
  );
};

export { Picker };
