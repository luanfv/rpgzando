import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import { serviceCards, serviceClasses, serviceRaces } from '@src/services';
import { useAuth, useLanguage } from '@src/hooks';
import { ICard } from '@src/types';
import { Header, Input, ModalSearch, Picker } from '@src/components';
import { Container, Content, Description, Image, List, Title } from './styles';
import { IRoutes } from '@src/types/routes';
import { IPickerItem } from '@src/types/components';
import { IGetOthersFilter } from '@src/types/services';

const SearchCard: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      class: '',
      race: '',
    },
  });

  const { user } = useAuth();
  const { language } = useLanguage();
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'SearchCard'>>();

  const [cards, setCards] = useState<ICard[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);

  const [races, setRaces] = useState<IPickerItem[]>([]);
  const [classes, setClasses] = useState<IPickerItem[]>([]);

  const handleRefresh = useCallback(() => {
    if (user) {
      setIsRefreshing(true);

      serviceCards
        .getOthers(user.uid, language.type)
        .then((response) => {
          setCards(response);
        })
        .finally(() => {
          setIsRefreshing(false);
        });
    }
  }, [language.type, user]);

  const onSearch = useCallback(
    async (data: IGetOthersFilter) => {
      setIsOpenModalSearch(false);

      if (user) {
        serviceCards
          .getOthers(user.uid, language.type, data)
          .then((response) => {
            console.log(response);

            setCards(response);
          });
      }
    },
    [language.type, user],
  );

  const handleClean = useCallback(() => {
    setIsOpenModalSearch(false);

    if (user) {
      serviceCards.getOthers(user.uid, language.type).then((response) => {
        setCards(response);
      });
    }
  }, [language.type, user]);

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
        .getOthers(user.uid, language.type)
        .then((response) => setCards(response));
    }
  }, [language.type, user]);

  useEffect(() => {
    serviceClasses.get(language.type).then((response) => {
      const classList: IPickerItem[] = response.map((item) => ({
        label: item.name,
        value: item.index,
        image: item.image,
      }));

      setClasses(classList);
    });
  }, [language.type]);

  useEffect(() => {
    serviceRaces.get(language.type).then((response) => {
      const raceList: IPickerItem[] = response.map((item) => ({
        label: item.name,
        value: item.index,
        image: item.image,
      }));

      setRaces(raceList);
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
        onSearch={handleSubmit(onSearch)}
        onClean={handleClean}
      >
        <>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                title="E-mail"
                placeholder="Search for e-mail..."
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                title="Race"
                items={races}
                selectedValue={value}
                onValueChange={onChange}
                onBlur={onBlur}
              />
            )}
            name="race"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Picker
                title="Class"
                items={classes}
                selectedValue={value}
                onValueChange={onChange}
                onBlur={onBlur}
              />
            )}
            name="class"
          />
        </>
      </ModalSearch>
    </>
  );
};

export { SearchCard };
