import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Body, Input, InputNumeric, Picker } from '@src/components';
import { serviceCards, serviceClasses, serviceRaces } from '@src/services';
import { IPickerItem } from '@src/types/components';
import { ICardForm } from '@src/types';
import { IRoutes } from '@src/types/routes';
import { useAuth } from '@src/hooks';

const schema = Yup.object().shape({
  name: Yup.string().required('You need to have a name!'),

  level: Yup.number().required(),

  class: Yup.string().required(),

  race: Yup.string().required(),

  hp: Yup.number().required(),

  for: Yup.number().required(),
  dex: Yup.number().required(),
  con: Yup.number().required(),
  int: Yup.number().required(),
  wis: Yup.number().required(),
  cha: Yup.number().required(),

  proficiencies: Yup.string().required('You need to have proficiencies!'),
  items: Yup.string().required('You need to have items!'),
  notes: Yup.string(),
});

const ChangeCard: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      level: 1,
      class: '',
      race: '',
      hp: 1,
      for: 1,
      dex: 1,
      con: 1,
      int: 1,
      wis: 1,
      cha: 1,
      proficiencies: '',
      items: '',
      notes: '',
    },
    resolver: yupResolver(schema),
  });

  const { reset } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'ChangeCard'>>();

  const nameRef = useRef<TextInput>(null);
  const levelRef = useRef<TextInput>(null);

  const [races, setRaces] = useState<IPickerItem[]>([]);
  const [classes, setClasses] = useState<IPickerItem[]>([]);

  const theme = useTheme();
  const { user } = useAuth();

  const onSubmit = useCallback(
    async (data: ICardForm) => {
      if (user) {
        const newCard = await serviceCards.post(user.uid, data, 'en');

        reset({
          routes: [{ name: 'Dashboard' }, { name: 'Card', params: newCard }],
          index: 1,
        });
      }
    },
    [reset, user],
  );

  useEffect(() => {
    serviceClasses
      .get('en')
      .then((response) => {
        const newClasses = response.map((item) => {
          return {
            label: item.name,
            value: item.index,
            image: item.image,
            description: `HP: 1d${item.hp} * your level`,
          };
        });

        setClasses(newClasses);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    serviceRaces
      .get('en')
      .then((response) => {
        const newRaces = response.map((item) => ({
          label: item.name,
          value: item.index,
          image: item.image,
          description: item.description,
        }));

        setRaces(newRaces);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Body>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            title="Name"
            placeholder="My character's name is..."
            reference={nameRef}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            maxLength={40}
            errorMessage={errors.name && errors.name.message}
            onSubmitEditing={() => levelRef.current?.focus()}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputNumeric
            title="Level"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={1}
            max={99}
          />
        )}
        name="level"
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
            title="Classe"
            items={classes}
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
          />
        )}
        name="class"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputNumeric
            title="HP"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={1}
            max={999}
          />
        )}
        name="hp"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputNumeric
            title="Force"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={1}
            max={20}
            random
          />
        )}
        name="for"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputNumeric
            title="Dexterity"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={1}
            max={20}
            random
          />
        )}
        name="dex"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputNumeric
            title="Constitution"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={1}
            max={20}
            random
          />
        )}
        name="con"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputNumeric
            title="Intelligence"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={1}
            max={20}
            random
          />
        )}
        name="int"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputNumeric
            title="Wisdom"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={1}
            max={20}
            random
          />
        )}
        name="wis"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputNumeric
            title="Charisma"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={1}
            max={20}
            random
          />
        )}
        name="cha"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            title="Proficiencies"
            placeholder="My proficiencies are..."
            reference={nameRef}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.proficiencies && errors.proficiencies.message}
            onSubmitEditing={() => levelRef.current?.focus()}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        )}
        name="proficiencies"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            title="Items"
            placeholder="My items are..."
            reference={nameRef}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.items && errors.items.message}
            onSubmitEditing={() => levelRef.current?.focus()}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        )}
        name="items"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            title="Notes"
            placeholder="My notes are..."
            reference={nameRef}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.notes && errors.notes.message}
            onSubmitEditing={() => levelRef.current?.focus()}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        )}
        name="notes"
      />

      <Button
        title="Confirm"
        onPress={handleSubmit(onSubmit)}
        color={theme.colors.secondary}
      />
    </Body>
  );
};

export { ChangeCard };
