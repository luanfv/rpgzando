import styled from 'styled-components/native';
import styles from '../../../../styles.json';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 20px;
  border-bottom-width: 1px;
  border-color: ${styles.primary};
  background-color: rgba(7, 78, 65, 0.2);
`;

export const Img = styled.Image`
  border-radius: 40px;
  width: 75px;
  height: 75px;
`;

export const Description = styled.View`
  margin-left: 16px;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 6px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #fff;
`;
