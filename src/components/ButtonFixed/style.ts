import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from '../../styles.json';

export const Container = styled.View`
  position: absolute;
  right: 20px;
  bottom: 12px;
  flex-direction: column;
`;

export const Button = styled(RectButton)<any>`
  border-radius: 35px;
  width: 70px;
  height: 70px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background-color: ${styles.secondary};
`;
