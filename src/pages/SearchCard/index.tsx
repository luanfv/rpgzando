import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from 'styled-components';

import { serviceCards, serviceClasses, serviceRaces } from '@src/services';
import { useAuth, useLanguage } from '@src/hooks';
import { ICard } from '@src/types';
import { CheckboxList, Header, Input } from '@src/components';
import { Container, Content, Description, Image, List, Title } from './styles';
import { IRoutes } from '@src/types/routes';
import { ICheckboxListItem } from '@src/types/components';

const SearchCard: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const theme = useTheme();
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
    (skill: string) => {
      if (races) {
        setSelectedRaces((oldState) => {
          const exists = oldState.find((value) => value === skill);

          if (exists) {
            return oldState.filter((value) => value !== skill);
          }

          return [...oldState, skill];
        });
      }
    },
    [races],
  );

  const isRacesCheckedCheckbox = useCallback(
    (skill) => !!selectedRaces.find((value) => value === skill),
    [selectedRaces],
  );

  const handleClassesToggleCheckbox = useCallback(
    (skill: string) => {
      if (classes) {
        setSelectedClasses((oldState) => {
          const exists = oldState.find((value) => value === skill);

          if (exists) {
            return oldState.filter((value) => value !== skill);
          }

          return [...oldState, skill];
        });
      }
    },
    [classes],
  );

  const isClassCheckedCheckbox = useCallback(
    (skill) => !!selectedClasses.find((value) => value === skill),
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

      <Modal
        isVisible={isOpenModalSearch}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View
          style={{
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            height: '95%',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 0.5,
              borderBottomColor: '#fff',
            }}
          >
            <TouchableOpacity
              onPress={() => setIsOpenModalSearch(false)}
              activeOpacity={0.8}
            >
              <Text style={{ color: '#fff' }}>Back</Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 2,
                margin: 20,
                width: '20%',
                borderRadius: 2,
              }}
            />

            <TouchableOpacity onPress={handleClean} activeOpacity={0.8}>
              <Text style={{ color: theme.colors.attention }}>Clean</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}
          >
            <Input
              title="E-mail"
              placeholder="Search for e-mail..."
              onChangeText={setSearchEmail}
            />

            <CheckboxList
              title="Races"
              item={races}
              isCheckedCheckbox={isRacesCheckedCheckbox}
              handleToggleCheckbox={handleRacesToggleCheckbox}
            />

            <CheckboxList
              title="Classes"
              item={classes}
              isCheckedCheckbox={isClassCheckedCheckbox}
              handleToggleCheckbox={handleClassesToggleCheckbox}
            />
          </ScrollView>

          <View
            style={{ padding: 20, borderTopWidth: 0.5, borderTopColor: '#fff' }}
          >
            <Button
              title="Search"
              onPress={handleSearch}
              color={theme.colors.secondary}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export { SearchCard };
