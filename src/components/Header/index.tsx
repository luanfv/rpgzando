import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';

import { IHeader } from '@src/types/components';
import { Container, Modal, Option, OptionButton, OptionText } from './styles';

const Header: React.FC<IHeader> = ({ onBack, options }) => {
  const theme = useTheme();

  const [isShowModal, setIsShowModal] = useState(false);

  const handlePress = useCallback((action: () => void) => {
    action();
    setIsShowModal(false);
  }, []);

  return (
    <Container>
      <TouchableOpacity onPress={onBack}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={theme.colors.text}
        />
      </TouchableOpacity>

      {options && (
        <>
          <TouchableOpacity onPress={() => setIsShowModal(true)}>
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color={theme.colors.text}
            />
          </TouchableOpacity>

          <Modal
            isVisible={isShowModal}
            animationIn="bounceInRight"
            animationOut="bounceOutRight"
            onBackdropPress={() => setIsShowModal(false)}
            onBackButtonPress={() => setIsShowModal(false)}
          >
            <Option>
              {options.map((option) => (
                <OptionButton
                  key={option.label}
                  onPress={() => handlePress(option.onPress)}
                >
                  <OptionText>{option.label}</OptionText>
                </OptionButton>
              ))}
            </Option>
          </Modal>
        </>
      )}
    </Container>
  );
};

export { Header };
