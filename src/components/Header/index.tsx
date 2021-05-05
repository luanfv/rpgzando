import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/core';

import { useCards } from '../../hooks/CardsContext';

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

interface Props {
  title: String;
  goBack?: Boolean;
  card?: Boolean;
  idCard?: String;
}

const Header: React.FC<Props> = ({
  title,
  goBack = false,
  card = false,
  idCard,
}) => {
  const navigation = useNavigation();

  const { removeCard } = useCards();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToHome = useCallback(() => {
    navigation.reset({
      routes: [{ name: 'cards' }],
      index: 0,
    });
  }, [navigation]);

  const navigate = useCallback(
    (screen: String) => {
      setIsModalOpen(false);
      navigation.navigate(String(screen));
    },
    [navigation],
  );

  const remove = useCallback(() => {
    const response = removeCard(String(idCard));

    if (response) {
      goToHome();
    }
  }, [goToHome, idCard, removeCard]);

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

      {card ? (
        <Options onPress={() => setIsModalOpen(true)}>
          <Icon name="cog" color="#fff" size={26} />
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
        {card ? (
          <Tooltip>
            <TooltipButton onPress={() => console.log('Compartilhar')}>
              <TooltipButtonText>Compartilhar</TooltipButtonText>
            </TooltipButton>

            <TooltipButton onPress={remove}>
              <TooltipButtonText>Excluir</TooltipButtonText>
            </TooltipButton>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipButton onPress={() => navigate('settings')}>
              <TooltipButtonText>Configurações</TooltipButtonText>
            </TooltipButton>

            <TooltipButton onPress={() => navigate('about')}>
              <TooltipButtonText>Sobre</TooltipButtonText>
            </TooltipButton>
          </Tooltip>
        )}
      </Modal>
    </Container>
  );
};

export default Header;
