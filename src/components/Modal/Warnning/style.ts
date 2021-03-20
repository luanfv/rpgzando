import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from '../../../styles.json';

export const Container = styled.View`
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  padding: 40px 40px 20px;
`;

export const Text = styled.Text<any>`
  font-size: 18px;
  font-weight: bold;
  color: ${styles.dark};
  text-align: center;
`;

export const Button = styled(RectButton)`
  width: 100%;
  padding: 16px;
  background-color: ${styles.secondary};
  border-radius: 16px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  text-align: center;
`;
