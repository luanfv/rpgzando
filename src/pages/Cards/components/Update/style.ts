import styled from 'styled-components/native';
import style from '../../../../styles.json';

export const Body = styled.View`
  flex: 1;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
`;

export const Main = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${style.bg};
`;

export const Container = styled.View`
  margin: 20px;
`;

export const Title = styled.View`
  background-color: ${style.primary};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const TitleText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const TitleIcon = styled.TouchableOpacity`
  padding-left: 20px;
`;
