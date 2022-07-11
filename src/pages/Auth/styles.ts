import styled, { css } from 'styled-components/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { RFValue } from 'react-native-responsive-fontsize';

const Container = styled.View`
  flex: 1;
  justify-content: space-around;
`;

const Header = styled.View`
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: ${RFValue(260)}px;
  height: ${RFValue(260)}px;
`;

const Title = styled.Text`
  font-weight: bold;

  ${({ theme }) => css`
    font-size: ${RFValue(theme.fonts.large)}px;
    color: ${theme.colors.text};
  `}
`;

const Description = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(theme.fonts.medium)}px;
    color: ${theme.colors.text};
  `}
`;

const GoogleAuth = styled(GoogleSigninButton)`
  width: 100%;
`;

export { Container, Header, Logo, Title, Description, GoogleAuth };
