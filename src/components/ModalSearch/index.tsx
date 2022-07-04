import React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';

import { Bar, Body, Container, Footer, Header, Modal, Text } from './styles';

interface IModalSearch {
  isVisible: boolean;

  onClose: () => void;
  onClean: () => void;
  onSearch: () => void;
}

const ModalSearch: React.FC<IModalSearch> = ({
  isVisible,
  children,

  onClean,
  onClose,
  onSearch,
}) => {
  const theme = useTheme();

  return (
    <Modal isVisible={isVisible}>
      <Container>
        <Header>
          <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
            <Text color="text">Back</Text>
          </TouchableOpacity>

          <Bar />

          <TouchableOpacity onPress={onClean} activeOpacity={0.8}>
            <Text color="attention">Clean</Text>
          </TouchableOpacity>
        </Header>

        <Body>{children}</Body>

        <Footer>
          <Button
            title="Search"
            onPress={onSearch}
            color={theme.colors.secondary}
          />
        </Footer>
      </Container>
    </Modal>
  );
};

export { ModalSearch };
