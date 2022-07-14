import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';

import { serviceCards, serviceClasses, serviceRaces } from '@src/services';
import { useLanguage, useToast } from '@src/hooks';
import { ICard } from '@src/types';
import { IRoutes } from '@src/types/routes';
import { IPickerItem } from '@src/types/components';
import {
  IGetOthersFilter,
  IServiceGetOthersLastResponse,
} from '@src/types/services';
import {
  BottomSpace,
  Card,
  Header,
  Input,
  List,
  Loading,
  ModalSearch,
  Picker,
} from '@src/components';

const SearchCard: React.FC = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      class: '',
      race: '',
    },
  });

  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'SearchCard'>>();

  const { language } = useLanguage();
  const { onToast } = useToast(language.toasts);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStopRequest, setHasStopRequest] = useState(false);

  const [races, setRaces] = useState<IPickerItem[]>([
    { label: language.pages.SearchCard.inputs.race.void, value: '' },
  ]);
  const [classes, setClasses] = useState<IPickerItem[]>([
    { label: language.pages.SearchCard.inputs.class.void, value: '' },
  ]);

  const [filter, setFilter] = useState<IGetOthersFilter | undefined>(undefined);
  const [cards, setCards] = useState<ICard[]>([]);
  const [lastDoc, setLastDoc] = useState<IServiceGetOthersLastResponse>();

  const onSearch = useCallback(
    async (data: IGetOthersFilter) => {
      setIsOpenModalSearch(false);
      setHasStopRequest(false);
      setFilter(data);

      serviceCards
        .getOthers(language.type, data)
        .then((response) => {
          setLastDoc(response.lastDoc);
          setCards(response.cards);
        })
        .catch(() => onToast('NO_CONNECTION'));
    },
    [language.type, onToast],
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
      .catch(() => onToast('NO_CONNECTION'))
      .finally(() => {
        setIsRefreshing(false);
      });
  }, [language.type, onToast, setValue]);

  const handleClean = useCallback(() => {
    setIsOpenModalSearch(false);
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
      .catch(() => onToast('NO_CONNECTION'));
  }, [language.type, onToast, setValue]);

  const handlePagination = useCallback(() => {
    if (hasStopRequest) {
      return;
    }

    setIsLoading(true);

    serviceCards
      .getOthers(language.type, filter, lastDoc)
      .then((response) => {
        setLastDoc(response.lastDoc);
        setCards((oldState) => [...oldState, ...response.cards]);
      })
      .catch((err) => {
        console.log('ERRO', err);
        setHasStopRequest(true);
      })
      .finally(() => setIsLoading(false));
  }, [filter, hasStopRequest, language.type, lastDoc]);

  const options = useMemo(() => {
    return [
      {
        label: language.pages.SearchCard.options.search,
        onPress: () => setIsOpenModalSearch(true),
      },
    ];
  }, [language.pages.SearchCard.options.search]);

  useEffect(() => {
    setIsLoading(true);

    serviceCards
      .getOthers(language.type)
      .then((response) => {
        setLastDoc(response.lastDoc);
        setCards(response.cards);
      })
      .finally(() => setIsLoading(false));
  }, [language.type]);

  useEffect(() => {
    serviceClasses
      .get(language.type)
      .then((response) => {
        const classList: IPickerItem[] = response.map((item) => ({
          label: item.name,
          value: item.index,
          image: item.image,
        }));

        setClasses([
          { label: language.pages.SearchCard.inputs.class.void, value: '' },
          ...classList,
        ]);
      })
      .catch(() => onToast('NO_CONNECTION'));
  }, [language.pages.SearchCard.inputs.class.void, language.type, onToast]);

  useEffect(() => {
    serviceRaces
      .get(language.type)
      .then((response) => {
        const raceList: IPickerItem[] = response.map((item) => ({
          label: item.name,
          value: item.index,
          image: item.image,
        }));

        setRaces([
          { label: language.pages.SearchCard.inputs.race.void, value: '' },
          ...raceList,
        ]);
      })
      .catch(() => onToast('NO_CONNECTION'));
  }, [language.pages.SearchCard.inputs.race.void, language.type, onToast]);

  return (
    <>
      <Header onBack={goBack} options={options} />

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
        onEndReached={handlePagination}
      />

      <ModalSearch
        isVisible={isOpenModalSearch}
        back={language.pages.SearchCard.buttons.back}
        clean={language.pages.SearchCard.buttons.clean}
        search={language.pages.SearchCard.buttons.search}
        onClose={() => setIsOpenModalSearch(false)}
        onSearch={handleSubmit(onSearch)}
        onClean={handleClean}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title={language.pages.SearchCard.inputs.email.label}
              placeholder={language.pages.SearchCard.inputs.email.placeholder}
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
              title={language.pages.SearchCard.inputs.race.label}
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
              title={language.pages.SearchCard.inputs.class.label}
              items={classes}
              selectedValue={value}
              onValueChange={onChange}
              onBlur={onBlur}
            />
          )}
          name="class"
        />
      </ModalSearch>
    </>
  );
};

export { SearchCard };
