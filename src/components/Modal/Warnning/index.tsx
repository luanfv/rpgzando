import React from 'react';
import Modal from 'react-native-modal';

import { useApp } from '../../../hooks/AppContext';

import { Container, Text, Button, ButtonText } from './style';

const ModalWarnning: React.FC = () => {
  const { removeWarnning, warnning } = useApp();

  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={!!warnning}
      onBackButtonPress={removeWarnning}
      onBackdropPress={removeWarnning}
    >
      <Container onTouchEnd={removeWarnning}>
        <Text>{warnning}</Text>
        <Button>
          <ButtonText>OK</ButtonText>
        </Button>
      </Container>
    </Modal>
  );
};

export default ModalWarnning;
