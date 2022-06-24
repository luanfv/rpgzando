import styled, { css } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IWelcomeText {
  bold?: boolean;
}

const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Welcome = styled.View`
  height: 80px;
  padding: ${({ theme }) => theme.spacing}px;
`;

const WelcomeText = styled.Text<IWelcomeText>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fonts.large}px;
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `};
`;

const Icon = styled(Ionicons)`
  font-size: ${({ theme }) => theme.fonts.large * 2}px;
  padding: ${({ theme }) => theme.spacing}px;
  color: ${({ theme }) => theme.colors.attention};
  font-weight: bold;
`;

export { Container, Header, Welcome, WelcomeText, Icon };
