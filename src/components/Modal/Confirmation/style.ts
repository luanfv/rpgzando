import styled from 'styled-components/native';

import styles from '../../../styles.json';

export const Container = styled.View`
  border-radius: 10px;
  background-color: ${styles.primary};
  width: 100%;
  padding: 40px 40px 20px;
`;

export const Text = styled.Text<any>`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const ButtonsContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const Button = styled.TouchableOpacity`
  margin-left: 10px;
  padding: 6px 10px;
`;

export const ButtonText = styled.Text<any>`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: ${({ secondary }) => (secondary ? styles.error : '#fff')};
`;
