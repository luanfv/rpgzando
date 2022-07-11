import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';

import { IInputNumeric } from '@src/types/components';

import {
  Input,
  Container,
  TitleContainer,
  TitleRandom,
  TitleText,
} from './styles';

const InputNumeric: React.FC<IInputNumeric> = ({
  title,
  value,
  min,
  max,
  random,
  onChange,
  onBlur,
}) => {
  const theme = useTheme();

  const handleRandom = useCallback(() => {
    const valueRandom = Math.floor(Math.random() * (max - (min - 1))) + min;

    onChange(valueRandom);
  }, [max, min, onChange]);

  return (
    <Container>
      <TitleContainer>
        <TitleText>{title}</TitleText>

        {random && (
          <TitleRandom onPress={handleRandom}>
            <Icon
              name="dice"
              size={theme.fonts.large}
              color={theme.colors.text}
            />
          </TitleRandom>
        )}
      </TitleContainer>

      <Input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        textColor="#fff"
        fontSize={theme.fonts.large}
        colorLeft={theme.colors.primary}
        colorRight={theme.colors.primary}
        colorPress={theme.colors.secondary}
        rounded
      />
    </Container>
  );
};

export { InputNumeric };
