import React, { useRef, useCallback } from 'react';
import { Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Input } from '@src/components';
import { Container } from './styles';
import { useTheme } from 'styled-components';

interface IForm {
  name: string;
  level: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Você precisa informar o nome!'),
  level: Yup.number()
    .required('Você precisa informar o nível!')
    .typeError('Esta entrada precisa ser do tipo númerica!')
    .integer('Você precisa passar um número inteiro!'),
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
    },
    resolver: yupResolver(schema),
  });

  const nameRef = useRef<TextInput>(null);
  const levelRef = useRef<TextInput>(null);

  const theme = useTheme();

  const onSubmit = useCallback((data: IForm) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Nome..."
            reference={nameRef}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name && errors.name.message}
            onSubmitEditing={() => levelRef.current?.focus()}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        rules={{
          max: 100,
          required: true,
        }}
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

      <Button title="Confirmar" onPress={handleSubmit(onSubmit)} color={theme.colors.secondary} />
    </Container>
  );
};

export { ChangeCard };
