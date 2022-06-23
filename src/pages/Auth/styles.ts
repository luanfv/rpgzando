import styled, { css } from 'styled-components/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const Container = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const Header = styled.View`
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: 260px;
  height: 260px;
`;

const Title = styled.Text`
  font-weight: bold;

  ${({ theme }) => css`
    font-size: ${theme.fonts.large}px;
    color: ${theme.colors.text};
  `}
`;

const Description = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.fonts.medium}px;
    color: ${theme.colors.text};
  `}
`;

const GoogleAuth = styled(GoogleSigninButton)`
  width: 100%;
`;

export { Container, Header, Logo, Title, Description, GoogleAuth };
