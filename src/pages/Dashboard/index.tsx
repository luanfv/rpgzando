import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { serviceCards } from '@src/services';
import { useAuth, useLanguage, useToast } from '@src/hooks';
import { ICard } from '@src/types';
import {
  BottomSpace,
  Card,
  HeaderDashboard,
  List,
  Loading,
  ModalConfirm,
} from '@src/components';
import { IMenuItem } from '@src/types/components';
import { IRoutes } from '@src/types/routes';

const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const { user, onSignOut } = useAuth();
  const { onToast } = useToast();
  const isFocused = useIsFocused();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'Dashboard'>>();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState('');

  const menuItems = useMemo<IMenuItem[]>(
    () => [
      {
        settings: {
          icon: 'person-add',
          title: language.pages.Dashboard.cards.create.title,
          message: language.pages.Dashboard.cards.create.description,
        },
        isMain: true,
        onPress: () => navigate('FormCard'),
      },
      {
        settings: {
          icon: 'ios-receipt',
          title: language.pages.Dashboard.cards.view.title,
          message: language.pages.Dashboard.cards.view.description,
        },
        isMain: false,
        onPress: () => navigate('SearchCard'),
      },
    ],
    [
      language.pages.Dashboard.cards.create.description,
      language.pages.Dashboard.cards.create.title,
      language.pages.Dashboard.cards.view.description,
      language.pages.Dashboard.cards.view.title,
      navigate,
    ],
  );

  const isModalOpen = useMemo(
    () => !!titleModal && !!descriptionModal,
    [descriptionModal, titleModal],
  );

  const handleRefresh = useCallback(() => {
    if (user) {
      setIsRefreshing(true);

      serviceCards
        .get(user.uid, language.type)
        .then((response) => {
          setCards(response);
        })
        .catch(() => onToast('NO_CONNECTION'))
        .finally(() => setIsRefreshing(false));
    }
  }, [language.type, onToast, user]);

  const handleOpenSignOutModal = useCallback(() => {
    setTitleModal(language.pages.Dashboard.modal.title);
    setDescriptionModal(language.pages.Dashboard.modal.description);
  }, [
    language.pages.Dashboard.modal.description,
    language.pages.Dashboard.modal.title,
  ]);

  const handleCloseSignOutModal = useCallback(() => {
    setTitleModal('');
    setDescriptionModal('');
  }, []);

  useEffect(() => {
    if (user && isFocused) {
      setIsLoading(true);

      serviceCards
        .get(user.uid, language.type)
        .then((response) => {
          setCards(response);
        })
        .catch(() => onToast('NO_CONNECTION'))
        .finally(() => setIsLoading(false));
    }
  }, [isFocused, language.type, onToast, user]);

  return (
    <>
      <HeaderDashboard
        text1={language.pages.Dashboard.welcome}
        text2={user && user.displayName ? user.displayName : ''}
        menuItems={menuItems}
        onSignOut={handleOpenSignOutModal}
      />

      <List
        showsVerticalScrollIndicator={false}
        data={cards}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => navigate('Card', item)} />
        )}
        ListFooterComponent={() => (
          <>
            {isLoading && <Loading margin={10} />}

            <BottomSpace />
          </>
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
