import styled from 'styled-components/native';
import styles from '../../styles.json';

export const Container = styled.View`
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-bottom: 6px;
`;

export const InputChange = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  font-size: 18px;
  padding: 8px 12px;
  color: ${styles.secondary};
`;
