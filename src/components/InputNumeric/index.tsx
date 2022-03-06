import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';

import styles from '../../styles.json';

import {
  Input,
  Container,
  TitleContainer,
  TitleRandom,
  TitleText,
} from './style';

interface IInputNumericProps {
  title: string;
  value: number;
  min: number;
  max: number;
  random?: boolean;
  onChange: (value: number) => void;
}

const InputNumeric: React.FC<IInputNumericProps> = ({
  title,
  value,
  onChange,
  min,
  max,
  random,
}) => {
  const handleRandom = useCallback(() => {
    Sound.setCategory('Playback');

    const dices = new Sound('dice.WAV', Sound.MAIN_BUNDLE, () => {
      dices.play();
    });

    onChange(Math.floor(Math.random() * (max - (min - 1))) + min);
  }, [max, min, onChange]);

  return (
    <Container>
      <TitleContainer>
        <TitleText>{title}</TitleText>

        {random && (
          <TitleRandom onPress={handleRandom}>
            <Icon name="dice" size={24} color="#fff" />
          </TitleRandom>
        )}
      </TitleContainer>

      <Input
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        textColor="#fff"
        fontSize={18}
        colorLeft={styles.primary}
        colorRight={styles.primary}
        colorPress={styles.secondary}
        rounded
      />
    </Container>
  );
};

export default InputNumeric;
