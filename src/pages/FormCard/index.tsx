import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Body, Header, Input, InputNumeric, Picker } from '@src/components';
import { serviceCards, serviceClasses, serviceRaces } from '@src/services';
import { IPickerItem } from '@src/types/components';
import { ICardForm } from '@src/types';
import { IRoutes } from '@src/types/routes';
import { useAuth, useLanguage } from '@src/hooks';

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

const FormCard: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
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

  const { reset, goBack } =
    useNavigation<NativeStackNavigationProp<IRoutes, 'FormCard'>>();
  const { params } = useRoute<RouteProp<IRoutes, 'Card'>>();

  const nameRef = useRef<TextInput>(null);
  const levelRef = useRef<TextInput>(null);

  const [races, setRaces] = useState<IPickerItem[]>([]);
  const [classes, setClasses] = useState<IPickerItem[]>([]);

  const theme = useTheme();
  const { user } = useAuth();
  const { language } = useLanguage();

  const onSubmit = useCallback(
    async (data: ICardForm) => {
      if (user) {
        if (params) {
          const updatedCard = await serviceCards.update(
            params.id,
            data,
            language.type,
          );

          reset({
            routes: [
              { name: 'Dashboard' },
              { name: 'Card', params: updatedCard },
            ],
            index: 1,
          });

          return;
        }

        const newCard = await serviceCards.post(user.uid, data, language.type);

        reset({
          routes: [{ name: 'Dashboard' }, { name: 'Card', params: newCard }],
          index: 1,
        });
      }
    },
    [language, params, reset, user],
  );

  useEffect(() => {
    serviceClasses
      .get(language.type)
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
  }, [language]);

  useEffect(() => {
    serviceRaces
      .get(language.type)
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
  }, [language]);

  useEffect(() => {
    if (params) {
      setValue('name', params.name);
      setValue('level', params.level);
      setValue('class', params.class.index);
      setValue('race', params.race.index);
      setValue('hp', params.hp);
      setValue('for', params.attributes.for);
      setValue('dex', params.attributes.dex);
      setValue('con', params.attributes.con);
      setValue('int', params.attributes.int);
      setValue('wis', params.attributes.wis);
      setValue('cha', params.attributes.cha);
      setValue('proficiencies', params.proficiencies);
      setValue('items', params.items);
      setValue('notes', params.notes);
      setValue('level', params.level);
    }
  }, [params, setValue]);

  return (
    <>
      <Header onBack={goBack} />

      <Body>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title={language.pages.FormCard.inputs.name.label}
              placeholder={language.pages.FormCard.inputs.name.placeholder}
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
              title={language.pages.FormCard.inputs.level.label}
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
              title={language.pages.FormCard.inputs.race.label}
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
              title={language.pages.FormCard.inputs.class.label}
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
              title={language.pages.FormCard.inputs.hp.label}
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
              title={language.pages.FormCard.inputs.for.label}
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
              title={language.pages.FormCard.inputs.dex.label}
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
              title={language.pages.FormCard.inputs.con.label}
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
              title={language.pages.FormCard.inputs.int.label}
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
              title={language.pages.FormCard.inputs.wis.label}
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
              title={language.pages.FormCard.inputs.cha.label}
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
              title={language.pages.FormCard.inputs.proficiencies.label}
              placeholder={
                language.pages.FormCard.inputs.proficiencies.placeholder
              }
              reference={nameRef}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={
                errors.proficiencies && errors.proficiencies.message
              }
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
              title={language.pages.FormCard.inputs.items.label}
              placeholder={language.pages.FormCard.inputs.items.placeholder}
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
              title={language.pages.FormCard.inputs.notes.label}
              placeholder={language.pages.FormCard.inputs.notes.placeholder}
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
          title={language.pages.FormCard.button}
          onPress={handleSubmit(onSubmit)}
          color={theme.colors.secondary}
        />
      </Body>
    </>
  );
};

export { FormCard };
