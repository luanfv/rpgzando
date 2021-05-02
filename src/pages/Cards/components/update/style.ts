import styled from 'styled-components/native';
import style from '../../../../styles.json';

export const Body = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${style.primary};
  border-radius: 6px;
`;

export const Container = styled.View`
  margin: 20px;
`;

export const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
`;

export const TitleText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const TitleIcon = styled.TouchableOpacity`
  padding-left: 20px;
`;
