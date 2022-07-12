import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import ModalLib from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';

interface IText {
  color: 'text' | 'attention';
}

const Modal = styled(ModalLib)`
  justify-content: flex-end;
  margin: 0;
`;

const Container = styled.View`
  height: ${Platform.OS === 'ios' ? 90 : 95}%;

  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    border-top-left-radius: ${RFValue(10)}px;
    border-top-right-radius: ${RFValue(10)}px;
  `}
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 0.5px;

  ${({ theme }) => css`
    padding: ${RFValue(10)}px ${RFValue(20)}px;
    border-bottom-color: ${theme.colors.text};
  `}
`;

const Body = styled.ScrollView`
  padding: ${({ theme }) => RFValue(theme.spacing)}px;
`;

const Footer = styled.View`
  border-top-width: 0.5px;

  ${({ theme }) => css`
    padding: ${RFValue(20)}px;
    border-top-color: ${theme.colors.text};
  `}
`;

const Bar = styled.View`
  width: 20%;

  ${({ theme }) => css`
    border-radius: ${RFValue(2)}px;
    background-color: ${theme.colors.text};
    padding: ${RFValue(2)}px;
    margin: ${RFValue(theme.spacing)}px;
  `}
`;

const Text = styled.Text<IText>`
  font-weight: bold;

  ${({ theme, color }) => css`
    font-size: ${RFValue(theme.fonts.medium)}px;
    color: ${theme.colors[color]};
  `}
`;

export { Modal, Container, Header, Body, Footer, Bar, Text };
