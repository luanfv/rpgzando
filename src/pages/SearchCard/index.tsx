import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import { serviceCards, serviceClasses, serviceRaces } from '@src/services';
import { useLanguage } from '@src/hooks';
import { ICard } from '@src/types';
import { IRoutes } from '@src/types/routes';
import { IPickerItem } from '@src/types/components';
import {
  IGetOthersFilter,
  IServiceGetOthersLastResponse,
} from '@src/types/services';
import { Header, Input, ModalSearch, Picker } from '@src/components';
import {
  Container,
  Content,
  Description,
  Image,
  List,
  Title,
  MarginBottom,
} from './styles';

const SearchCard: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      class: '',
      race: '',
    },
  });

  const { language } = useLanguage();
  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'SearchCard'>>();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
  const [hasStopRequest, setHasStopRequest] = useState(false);

  const [races, setRaces] = useState<IPickerItem[]>([
    { label: 'No filter', value: '' },
  ]);
  const [classes, setClasses] = useState<IPickerItem[]>([
    { label: 'No filter', value: '' },
  ]);

  const [filter, setFilter] = useState<IGetOthersFilter | undefined>(undefined);
  const [cards, setCards] = useState<ICard[]>([]);
  const [lastDoc, setLastDoc] = useState<IServiceGetOthersLastResponse>();

  const onSearch = useCallback(
    async (data: IGetOthersFilter) => {
      setIsOpenModalSearch(false);
      setHasStopRequest(false);
      setFilter(data);

      serviceCards.getOthers(language.type, data).then((response) => {
        setLastDoc(response.lastDoc);
        setCards(response.cards);
      });
    },
    [language.type],
  );

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setHasStopRequest(false);

    serviceCards
      .getOthers(language.type)
      .then((response) => {
        setLastDoc(response.lastDoc);
        setCards(response.cards);
        setFilter(undefined);

        setValue('email', '');
        setValue('class', '');
        setValue('race', '');
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  }, [language.type, setValue]);

  const handleClean = useCallback(() => {
    setIsOpenModalSearch(false);
    setHasStopRequest(false);

    serviceCards.getOthers(language.type).then((response) => {
      setLastDoc(response.lastDoc);
      setCards(response.cards);
      setFilter(undefined);

      setValue('email', '');
      setValue('class', '');
      setValue('race', '');
    });
  }, [language.type, setValue]);

  const handlePagination = useCallback(() => {
    if (hasStopRequest) {
      return;
    }

    serviceCards
      .getOthers(language.type, filter, lastDoc)
      .then((response) => {
        setLastDoc(response.lastDoc);
        setCards((oldState) => [...oldState, ...response.cards]);
      })
      .catch((err) => {
        console.log('ERRO', err);
        setHasStopRequest(true);
      });
  }, [filter, hasStopRequest, language.type, lastDoc]);

  const options = useMemo(() => {
    return [
      {
        label: 'Search',
        onPress: () => setIsOpenModalSearch(true),
      },
    ];
  }, []);

  useEffect(() => {
    serviceCards.getOthers(language.type).then((response) => {
      setLastDoc(response.lastDoc);
      setCards(response.cards);
    });
  }, [language.type]);

  useEffect(() => {
    serviceClasses.get(language.type).then((response) => {
      const classList: IPickerItem[] = response.map((item) => ({
        label: item.name,
        value: item.index,
        image: item.image,
      }));

      setClasses([{ label: 'No filter', value: '' }, ...classList]);
    });
  }, [language.type]);

  useEffect(() => {
    serviceRaces.get(language.type).then((response) => {
      const raceList: IPickerItem[] = response.map((item) => ({
        label: item.name,
        value: item.index,
        image: item.image,
      }));

      setRaces([{ label: 'No filter', value: '' }, ...raceList]);
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
        onEndReached={handlePagination}
      />

      <ModalSearch
        isVisible={isOpenModalSearch}
        onClose={() => setIsOpenModalSearch(false)}
        onSearch={handleSubmit(onSearch)}
        onClean={handleClean}
      >
        <MarginBottom>
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
        </MarginBottom>
      </ModalSearch>
    </>
  );
};

export { SearchCard };
