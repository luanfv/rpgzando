import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

import styles from '../../styles.json';

export const Main = styled.View`
  margin: 20px;
`;

export const Container = styled.View`
  margin: 20px 0;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const SelectImageContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${styles.primary};
  margin: auto;
  overflow: hidden;
`;

export const SelectImage = styled.Image`
  width: 75px;
  height: 75px;
  margin: auto;
`;

export const SelectContainer = styled.View`
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
`;

export const Select = styled(Picker)`
  color: ${styles.bg};
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 8px 12px;
`;

export const Expertise = styled.View<any>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 0 5px;
  border-radius: 2px;
  ${(props) => props.selected && 'background-color: rgba(7, 78, 65, .2)'}
`;
