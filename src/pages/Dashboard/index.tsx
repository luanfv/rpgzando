import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { serviceCards } from '@src/services';
import { useAuth } from '@src/hooks';
import { ICard } from '@src/types';
import { HeaderDashboard, ModalConfirm } from '@src/components';
import { IMenuItem } from '@src/types/components';
import { Container, Content, Description, Image, List, Title } from './styles';
import { IRoutes } from '@src/types/routes';
import { RefreshControl } from 'react-native';

const Dashboard: React.FC = () => {
  const { user, onSignOut } = useAuth();
  const isFocused = useIsFocused();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'Dashboard'>>();

  const [cards, setCards] = useState<ICard[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState('');

  const menuItems = useMemo<IMenuItem[]>(
    () => [
      {
        type: 'create',
        isMain: true,
        onPress: () => navigate('FormCard'),
      },
      {
        type: 'view',
        isMain: false,
        onPress: () => {},
      },
    ],
    [navigate],
  );

  const isModalOpen = useMemo(
    () => !!titleModal && !!descriptionModal,
    [descriptionModal, titleModal],
  );

  const handleRefresh = useCallback(() => {
    if (user) {
      setIsRefreshing(true);

      serviceCards
        .get('en', user.uid)
        .then((response) => {
          setCards(response);
        })
        .finally(() => {
          setIsRefreshing(false);
        });
    }
  }, [user]);

  const handleOpenSignOutModal = useCallback(() => {
    setTitleModal('Sign Out');
    setDescriptionModal('Are you sure you want to log out of your account?');
  }, []);

  const handleCloseSignOutModal = useCallback(() => {
    setTitleModal('');
    setDescriptionModal('');
  }, []);

  useEffect(() => {
    if (user && isFocused) {
      serviceCards.get('en', user.uid).then((response) => {
        setCards(response);
      });
    }
  }, [isFocused, user]);

  return (
    <>
      <HeaderDashboard
        text1="Welcome,"
        text2={user && user.displayName ? user.displayName : ''}
        menuItems={menuItems}
        onSignOut={handleOpenSignOutModal}
      />

      <List
        showsVerticalScrollIndicator={false}
        data={cards}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <Container activeOpacity={0.8} onPress={() => navigate('Card', item)}>
            <Image source={{ uri: item.race.image }} />

            <Content>
              <Title>{item.name}</Title>

              <Description>{item.class.name}</Description>
            </Content>
          </Container>
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />

      <ModalConfirm
        isVisible={isModalOpen}
        title={titleModal}
        description={descriptionModal}
        onClose={handleCloseSignOutModal}
        onConfirm={onSignOut}
        isAttention
      />
    </>
  );
};

export { Dashboard };
