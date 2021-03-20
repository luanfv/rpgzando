import React, { useCallback } from 'react';
import Modal from 'react-native-modal';

import { Container, Text, ButtonsContainer, Button, ButtonText } from './style';

interface Props {
  isOpen: Boolean;
  message: String;
  confirmed: () => void;
  close: () => void;
}

const ModalWarnning: React.FC<Props> = ({
  isOpen,
  message,
  close,
  confirmed,
}) => {
  const handleConfirmed = useCallback(() => {
    confirmed();

    close();
  }, [confirmed, close]);

  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={!!isOpen}
      onBackButtonPress={close}
      onBackdropPress={close}
    >
      <Container>
        <Text>{message}</Text>

        <ButtonsContainer>
          <Button onPress={close}>
            <ButtonText>Cancelar</ButtonText>
          </Button>

          <Button onPress={handleConfirmed}>
            <ButtonText secondary>Confirmar</ButtonText>
          </Button>
        </ButtonsContainer>
      </Container>
    </Modal>
  );
};

export default ModalWarnning;
