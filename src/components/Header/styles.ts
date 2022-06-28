import styled, { css } from 'styled-components/native';
import ModalLib from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';

const Container = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Modal = styled(ModalLib)`
  position: absolute;
  right: 0;
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
