import React from 'react';
import { Button } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'styled-components';

import { IModalConfirm } from '@src/types/components';
import {
  ButtonContainer,
  Buttons,
  Container,
  Description,
  Title,
} from './styles';

const ModalConfirm: React.FC<IModalConfirm> = ({
  title,
  description,
  isVisible,
  isAttention,

  onClose,
  onConfirm,
}) => {
  const theme = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <Container>
        <Title>{title}</Title>

        <Description>{description}</Description>

        <Buttons>
          <ButtonContainer>
            <Button
              title="Confirm"
              color={
                isAttention ? theme.colors.attention : theme.colors.secondary
              }
              onPress={onConfirm}
            />
          </ButtonContainer>

          <ButtonContainer>
            <Button
              title="Cancel"
              color={
                isAttention ? theme.colors.secondary : theme.colors.attention
              }
              onPress={onClose}
            />
          </ButtonContainer>
        </Buttons>
      </Container>
    </Modal>
  );
};

export { ModalConfirm };
