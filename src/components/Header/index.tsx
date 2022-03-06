import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/core';

import { useCards } from '../../hooks/CardsContext';

import ModalConfirmation from '../../components/Modal/Confirmation';

import {
  Container,
  TitleContainer,
  BackButton,
  SubTitle,
  Title,
  Options,
  Tooltip,
  TooltipButton,
  TooltipButtonText,
} from './style';

interface IHeaderProps {
  title: string;
  goBack?: boolean;
  idCard?: string;
}

const Header: React.FC<IHeaderProps> = ({ title, goBack = false, idCard }) => {
  const navigation = useNavigation();

  const { removeCard } = useCards();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationRemove, setIsConfirmationRemove] = useState(false);

  const goToHome = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'cards' }],
      index: 0,
    });
  }, [navigation]);

  const navigate = useCallback(
    (screen: string) => {
      setIsModalOpen(false);
      navigation.navigate(screen);
    },
    [navigation],
  );

  const remove = useCallback(
    (id: string) => {
      const response = removeCard(id);

      if (response) {
        goToHome();
      }
    },
    [goToHome, removeCard],
  );

  return (
    <Container>
      <TitleContainer>
        {goBack ? (
          <>
            <BackButton onPress={goToHome}>
              <Icon name="arrow-left" color="#fff" size={20} />
            </BackButton>

            <Title>{title}</Title>
          </>
        ) : (
          <View>
            <SubTitle>Seja bem-vindo(a),</SubTitle>
            <Title>{title}</Title>
          </View>
        )}
      </TitleContainer>

      {idCard ? (
        <Options
          onPress={() => {
            setIsModalOpen(false);
            setIsConfirmationRemove(true);
          }}
        >
          <Icon name="trash" color="#fff" size={20} />
        </Options>
      ) : (
        <Options onPress={() => setIsModalOpen(true)}>
          <Icon name="bars" color="#fff" size={26} />
        </Options>
      )}

      <Modal
        isVisible={isModalOpen}
        backdropOpacity={0.1}
        animationInTiming={1}
        animationOutTiming={1}
        onBackdropPress={() => setIsModalOpen(false)}
        onBackButtonPress={() => setIsModalOpen(false)}
      >
        <Tooltip>
          <TooltipButton onPress={() => navigate('settings')}>
            <TooltipButtonText>Configurações</TooltipButtonText>
          </TooltipButton>

          <TooltipButton onPress={() => navigate('about')}>
            <TooltipButtonText>Sobre</TooltipButtonText>
          </TooltipButton>
        </Tooltip>
      </Modal>

      <ModalConfirmation
        isOpen={isConfirmationRemove}
        message="Tem certeza que deseja remover essa ficha?"
        confirmed={() => idCard && remove(idCard)}
        close={() => setIsConfirmationRemove(false)}
      />
    </Container>
  );
};

export default Header;
