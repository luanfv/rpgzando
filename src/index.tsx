import React, { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { View, Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { Input } from '@src/components';

const App: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      level: '',
    },
  });

  const nameRef = useRef<TextInput>(null);
  const levelRef = useRef<TextInput>(null);

  const onSubmit = (data: any) => console.log(data);

  return (
    <View>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            reference={nameRef}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorMessage={errors.name && 'Você precisa informar o nome!'}
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
            reference={levelRef}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="decimal-pad"
            autoCorrect={false}
            errorMessage={errors.level && 'Você precisa informar o nível!'}
          />
        )}
        name="level"
      />

      <Button title="Confirmar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default App;
