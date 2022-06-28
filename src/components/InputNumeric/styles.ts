import styled from 'styled-components/native';
import InputSpinner from 'react-native-input-spinner';
import { RFValue } from 'react-native-responsive-fontsize';

const Input = styled(InputSpinner)`
  border-radius: 0;
  border-bottom-width: ${RFValue(1)}px;
  border-color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${RFValue(10)}px;
  padding-bottom: ${RFValue(6)}px;
`;

const Container = styled.View`
  margin: ${RFValue(8)}px 0;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${RFValue(12)}px;
  margin-top: ${RFValue(12)}px;
`;

const TitleText = styled.Text`
  font-size: ${({ theme }) => RFValue(theme.fonts.large)}px;
  color: ${({ theme }) => theme.colors.text};
`;

const TitleRandom = styled.TouchableOpacity`
  padding-left: ${RFValue(30)}px;
  padding-right: ${RFValue(10)}px;
  padding-bottom: ${RFValue(10)}px;
`;

export { Container, Input, TitleContainer, TitleText, TitleRandom };
