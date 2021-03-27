import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from '../../styles.json';

export const Container = styled(RectButton)<any>`
  width: 100%;
  padding: 12px 20px;
  border-radius: 6px;
  background-color: ${styles.secondary};

  flex-direction: row;
  align-items: center;
  justify-content: ${({ icon }) => (icon ? 'space-between' : 'center')};
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;
