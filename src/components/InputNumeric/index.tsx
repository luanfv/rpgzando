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

interface IProps {
  title: String;
  value: Number;
  min: Number;
  max: Number;
  random?: Boolean;
  onChange: (value: Number) => void;
}

const InputNumeric: React.FC<IProps> = ({
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

    onChange(
      Number(
        Math.floor(Math.random() * (Number(max) - Number(Number(min) - 1))) +
          Number(min),
      ),
    );
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
        value={Number(value)}
        onChange={onChange}
        min={Number(min)}
        max={Number(max)}
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
