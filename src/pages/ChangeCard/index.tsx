import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';

import { Input, Picker } from '@src/components';
import { serviceClasses } from '@src/services';
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
});

const ChangeCard: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      level: '',
      class: '',
    },
    resolver: yupResolver(schema),
  });

  const nameRef = useRef<TextInput>(null);
  const levelRef = useRef<TextInput>(null);

  const [classes, setClasses] = useState<IPickerItem[]>([]);

  const theme = useTheme();

  const onSubmit = useCallback((data: ICardForm) => {
    console.log(data);
  }, []);

  useEffect(() => {
    serviceClasses.get().then((response) => {
      const { data } = response;

      const newClasses = data.results.map((item) => ({
        label: item.name,
        value: item.index,
      }));

      setClasses(newClasses);
    });
  }, []);

  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Nome..."
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
          <Input
            placeholder="Nível..."
            reference={levelRef}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="decimal-pad"
            autoCorrect={false}
            maxLength={3}
            errorMessage={errors.level && errors.level.message}
          />
        )}
        name="level"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            items={classes}
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
          />
        )}
        name="class"
      />

      <Button
        title="Confirmar"
        onPress={handleSubmit(onSubmit)}
        color={theme.colors.secondary}
      />
    </Container>
  );
};

export { ChangeCard };
