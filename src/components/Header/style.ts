import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from '../../styles.json';

export const Container = styled.View`
  padding: 0 20px;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${styles.primary};
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled(RectButton)`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const SubTitle = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const Options = styled.TouchableOpacity`
  padding: 10px;
`;

export const Tooltip = styled.View`
  background-color: #fff;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  margin: -10px;
`;

export const TooltipButton = styled.TouchableOpacity`
  width: 280px;
  padding: 10px 20px;
`;

export const TooltipButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${styles.primary};
`;
