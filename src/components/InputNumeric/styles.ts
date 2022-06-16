import styled from 'styled-components/native';
import InputSpinner from 'react-native-input-spinner';

const Input = styled(InputSpinner)`
  border-radius: 0;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 10px;
  padding-bottom: 6px;
`;

const Container = styled.View`
  margin: 8px 0;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 12px;
`;

const TitleText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.large}px;
  color: ${({ theme }) => theme.colors.text};
`;

const TitleRandom = styled.TouchableOpacity`
  padding-left: 30px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

export { Container, Input, TitleContainer, TitleText, TitleRandom };
