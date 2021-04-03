import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
  random?: Boolean;
}

const InputNumeric: React.FC<IProps> = ({ title, random }) => {
  return (
    <Container>
      <TitleContainer>
        <TitleText>{title}</TitleText>

        {random && (
          <TitleRandom>
            <Icon name="dice" size={24} color="#fff" />
          </TitleRandom>
        )}
      </TitleContainer>

      <Input
        value={1}
        min={1}
        rounded
        textColor="#fff"
        fontSize={18}
        colorLeft={styles.primary}
        colorRight={styles.primary}
        colorPress={styles.secondary}
      />
    </Container>
  );
};

export default InputNumeric;
