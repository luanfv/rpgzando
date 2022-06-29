import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RefreshControl } from 'react-native';

import { serviceCards, serviceClasses, serviceRaces } from '@src/services';
import { useAuth, useLanguage } from '@src/hooks';
import { ICard } from '@src/types';
import { Header, ModalSearch } from '@src/components';
import { Container, Content, Description, Image, List, Title } from './styles';
import { IRoutes } from '@src/types/routes';
import { ICheckboxListItem } from '@src/types/components';

const SearchCard: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'SearchCard'>>();

  const [cards, setCards] = useState<ICard[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);

  const [searchEmail, setSearchEmail] = useState('');

  const [races, setRaces] = useState<ICheckboxListItem[]>([]);
  const [selectedRaces, setSelectedRaces] = useState<string[]>([]);

  const [classes, setClasses] = useState<ICheckboxListItem[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const handleRefresh = useCallback(() => {
    if (user) {
      setIsRefreshing(true);

      serviceCards
        .getOthers(language.type, user.uid)
        .then((response) => {
          setCards(response);
        })
        .finally(() => {
          setIsRefreshing(false);
        });
    }
  }, [language.type, user]);

  const handleRacesToggleCheckbox = useCallback(
    (index: string) => {
      if (races) {
        setSelectedRaces((oldState) => {
          const exists = oldState.find((value) => value === index);

          if (exists) {
            return oldState.filter((value) => value !== index);
          }

          return [...oldState, index];
        });
      }
    },
    [races],
  );

  const isRacesCheckedCheckbox = useCallback(
    (index: string) => !!selectedRaces.find((value) => value === index),
    [selectedRaces],
  );

  const handleClassesToggleCheckbox = useCallback(
    (index: string) => {
      if (classes) {
        setSelectedClasses((oldState) => {
          const exists = oldState.find((value) => value === index);

          if (exists) {
            return oldState.filter((value) => value !== index);
          }

          return [...oldState, index];
        });
      }
    },
    [classes],
  );

  const isClassCheckedCheckbox = useCallback(
    (index: string) => !!selectedClasses.find((value) => value === index),
    [selectedClasses],
  );

  const handleSearch = useCallback(() => {
    console.log(searchEmail);
    console.log(selectedClasses);
    console.log(selectedRaces);

    setIsOpenModalSearch(false);
  }, [searchEmail, selectedClasses, selectedRaces]);

  const handleClean = useCallback(() => {
    setSearchEmail('');
    setSelectedClasses([]);
    setSelectedRaces([]);

    setIsOpenModalSearch(false);
  }, []);

  const options = useMemo(() => {
    return [
      {
        label: 'Search',
        onPress: () => setIsOpenModalSearch(true),
      },
    ];
  }, []);

  useEffect(() => {
    if (user) {
      serviceCards
        .getOthers(language.type, user.uid)
        .then((response) => setCards(response));
    }
  }, [language.type, user]);

  useEffect(() => {
    serviceClasses.get(language.type).then((response) => {
      setClasses(response);
    });
  }, [language.type]);

  useEffect(() => {
    serviceRaces.get(language.type).then((response) => {
      setRaces(response);
    });
  }, [language.type]);

  return (
    <>
      <Header onBack={goBack} options={options} />

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

      <ModalSearch
        isVisible={isOpenModalSearch}
        onClose={() => setIsOpenModalSearch(false)}
        email={searchEmail}
        setEmail={setSearchEmail}
        classes={{
          data: classes,
          isChecked: isClassCheckedCheckbox,
          onToggleCheck: handleClassesToggleCheckbox,
        }}
        races={{
          data: races,
          isChecked: isRacesCheckedCheckbox,
          onToggleCheck: handleRacesToggleCheckbox,
        }}
        onSearch={handleSearch}
        onClean={handleClean}
      />
    </>
  );
};

export { SearchCard };
