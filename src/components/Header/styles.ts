import styled, { css } from 'styled-components/native';
import ModalLib from 'react-native-modal';

const Container = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Modal = styled(ModalLib)`
  position: absolute;
  right: 0;
`;

const Option = styled.View`
  padding: 4px 8px;
  border-radius: 1px;
  min-width: 180px;

  ${({ theme }) => css`
    background-color: ${theme.colors.text};
  `}
`;

const OptionButton = styled.TouchableOpacity`
  padding: 6px 0;
  margin: 2px 0;
`;

const OptionText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.medium}px;
  `}
`;

export { Container, Modal, Option, OptionButton, OptionText };
