import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

interface IContainer {
  hasError: boolean;
}

const Title = styled.Text`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fonts.large}px;
  color: ${({ theme }) => theme.colors.text};
`;

const Container = styled(TextInput)<IContainer>`
  ${({ theme, hasError }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    border-color: ${hasError ? theme.colors.attention : theme.colors.textLight};
    font-size: ${theme.fonts.medium}px;
  `}

  border-width: 1px;
  border-radius: 4px;
  padding: 12px;
`;

const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.attention};
    margin-left: ${theme.spacing / 2}px;
    height: ${theme.spacing * 2}px;
    font-size: ${theme.fonts.small}px;
  `}
`;

export { Title, Container, Message };
