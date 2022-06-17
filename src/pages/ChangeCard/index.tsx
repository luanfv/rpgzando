import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';

import { Input, InputNumeric, Picker } from '@src/components';
import { serviceClasses, serviceRaces } from '@src/services';
import { Container } from './styles';
import { IPickerItem } from '@src/types/components';
import { ICardForm } from '@src/types';

const schema = Yup.object().shape({
  name: Yup.string().required('Você precisa informar o nome!'),

  level: Yup.number()
    .required('Você precisa informar o nível!')
    .typeError('Esta entrada precisa ser do tipo númerica!')
    .integer('Você precisa passar um número inteiro!'),

  class: Yup.string().required(),

  race: Yup.string().required(),

  hp: Yup.number().required(),

  for: Yup.number().required(),
  dex: Yup.number().required(),
  con: Yup.number().required(),
  int: Yup.number().required(),
  wis: Yup.number().required(),
  cha: Yup.number().required(),
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
    },
    resolver: yupResolver(schema),
  });

  const nameRef = useRef<TextInput>(null);
  const levelRef = useRef<TextInput>(null);

  const [classes, setClasses] = useState<IPickerItem[]>([]);
  const [races, setRaces] = useState<IPickerItem[]>([]);

  const theme = useTheme();

  const onSubmit = useCallback((data: ICardForm) => {
    console.log(data);
  }, []);

  useEffect(() => {
    serviceClasses
      .get()
      .then((response) => {
        const newClasses = response.map((item) => ({
          label: item.name,
          value: item.index,
          image: item.image,
        }));

        setClasses(newClasses);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    serviceRaces
      .get()
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
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Name..."
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
            max={20}
            random
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

      <Button
        title="Confirm"
        onPress={handleSubmit(onSubmit)}
        color={theme.colors.secondary}
      />
    </Container>
  );
};

export { ChangeCard };
