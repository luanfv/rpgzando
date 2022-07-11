import React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';

import { IModalSearch } from '@src/types/components';
import { Bar, Body, Container, Footer, Header, Modal, Text } from './styles';

const ModalSearch: React.FC<IModalSearch> = ({
  isVisible,
  back,
  clean,
  search,
  children,

  onClean,
  onClose,
  onSearch,
}) => {
  const theme = useTheme();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <Container>
        <Header>
          <TouchableOpacity onPress={onClose} activeOpacity={0.8}>
            <Text color="text">{back}</Text>
          </TouchableOpacity>

          <Bar />

          <TouchableOpacity onPress={onClean} activeOpacity={0.8}>
            <Text color="attention">{clean}</Text>
          </TouchableOpacity>
        </Header>

        <Body>{children}</Body>

        <Footer>
          <Button
            title={search}
            onPress={onSearch}
            color={theme.colors.secondary}
          />
        </Footer>
      </Container>
    </Modal>
  );
};

export { ModalSearch };
