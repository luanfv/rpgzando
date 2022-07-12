import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import ModalLib from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.1);
  padding: 15px ${({ theme }) => RFValue(theme.spacing)}px;
  ${({ theme }) =>
    Platform.OS === 'ios' &&
    css`
      padding-top: ${RFValue(theme.spacing) + getStatusBarHeight()}px;
    `}
`;

const Modal = styled(ModalLib)`
  position: absolute;
  right: 0;
  ${Platform.OS === 'ios' &&
  css`
    top: ${getStatusBarHeight()}px;
  `}
`;

const Option = styled.View`
  padding: ${RFValue(4)}px ${RFValue(8)}px;
  border-radius: ${RFValue(1)}px;
  min-width: ${RFValue(180)}px;

  ${({ theme }) => css`
    background-color: ${theme.colors.text};
  `}
`;

const OptionButton = styled.TouchableOpacity`
  padding: ${RFValue(6)}px 0;
  margin: ${RFValue(2)}px 0;
`;

const OptionText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: ${RFValue(theme.fonts.medium)}px;
  `}
`;

export { Container, Modal, Option, OptionButton, OptionText };
