import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IContainer {
  hasError: boolean;
}

const Title = styled.Text`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${RFValue(12)}px;
  margin-top: 12px;
  font-size: ${({ theme }) => RFValue(theme.fonts.large)}px;
  color: ${({ theme }) => theme.colors.text};
`;

const Container = styled(TextInput)<IContainer>`
  ${({ theme, hasError }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    border-color: ${hasError ? theme.colors.attention : theme.colors.textLight};
    font-size: ${RFValue(theme.fonts.medium)}px;
  `}

  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(4)}px;
  padding: ${RFValue(12)}px;
`;

const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.attention};
    margin-left: ${RFValue(theme.spacing / 2)}px;
    height: ${RFValue(theme.spacing * 2)}px;
    font-size: ${RFValue(theme.fonts.small)}px;
  `}
`;

export { Title, Container, Message };
