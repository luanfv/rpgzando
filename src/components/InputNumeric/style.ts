import styled from 'styled-components/native';
import InputSpinner from 'react-native-input-spinner';

export const Input = styled(InputSpinner)`
  border-radius: 0;
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  padding-bottom: 6px;
`;

export const Container = styled.View`
  margin: 20px 0;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 12px;
`;

export const TitleText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const TitleRandom = styled.TouchableOpacity`
  padding-left: 30px;
  padding-right: 10px;
  padding-bottom: 10px;
`;
