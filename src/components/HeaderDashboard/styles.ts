import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface IWelcomeText {
  bold?: boolean;
}

const Container = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  ${Platform.OS === 'ios' &&
  css`
    padding-top: ${getStatusBarHeight()}px;
  `}
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Welcome = styled.View`
  height: ${RFValue(80)}px;
  padding: ${({ theme }) => RFValue(theme.spacing)}px;
`;

const WelcomeText = styled.Text<IWelcomeText>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => RFValue(theme.fonts.large)}px;
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `};
`;

const Icon = styled(Ionicons)`
  font-size: ${({ theme }) => RFValue(theme.fonts.large * 2)}px;
  padding: ${({ theme }) => RFValue(theme.spacing)}px;
  color: ${({ theme }) => theme.colors.attention};
  font-weight: bold;
`;

export { Container, Header, Welcome, WelcomeText, Icon };
