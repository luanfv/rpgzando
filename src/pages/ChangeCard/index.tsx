import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';

import { CheckboxList, Input, InputNumeric, Picker } from '@src/components';
import { serviceClasses, serviceRaces } from '@src/services';
import { Container } from './styles';
import { IPickerItem, ISkillList } from '@src/types/components';
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
    getValues,
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

  const [races, setRaces] = useState<IPickerItem[]>([]);
  const [classes, setClasses] = useState<IPickerItem[]>([]);
  const [skills, setSkills] = useState<ISkillList[]>([]);
  const [selectedClassSkills, setSelectedClassSkills] = useState<
    ISkillList | undefined
  >(undefined);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const theme = useTheme();

  const onSubmit = useCallback(
    (data: ICardForm) => {
      console.log({ ...data, skills: selectedSkills });
    },
    [selectedSkills],
  );

  const isCheckedCheckbox = useCallback(
    (skill) => !!selectedSkills.find((value) => value === skill),
    [selectedSkills],
  );

  const handleToggleCheckbox = useCallback(
    (skill: string) => {
      if (selectedClassSkills) {
        setSelectedSkills((oldState) => {
          const exists = oldState.find((value) => value === skill);

          if (exists) {
            return oldState.filter((value) => value !== skill);
          }

          if (oldState.length >= selectedClassSkills.choose) {
            return oldState;
          }

          return [...oldState, skill];
        });
      }
    },
    [selectedClassSkills],
  );

  const handleOnBlurClass = useCallback(
    (onBlur: () => void) => {
      onBlur();
      setSelectedSkills([]);

      const response = skills.find((item) => item.index === getValues('class'));

      setSelectedClassSkills(response);
    },
    [getValues, skills],
  );

  useEffect(() => {
    serviceClasses
      .get()
      .then((response) => {
        const newClasses: IPickerItem[] = [];
        const newProficiencies: ISkillList[] = [];

        response.forEach((item) => {
          newClasses.push({
            label: item.name,
            value: item.index,
            image: item.image,
            description: `HP: 1d${item.hp} * your level`,
          });

          newProficiencies.push({
            index: item.index,
            choose: item.skills.choose,
            data: item.skills.data,
          });
        });

        setClasses(newClasses);
        setSkills(newProficiencies);
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
            onBlur={() => handleOnBlurClass(onBlur)}
          />
        )}
        name="class"
      />

      {selectedClassSkills && (
        <CheckboxList
          title={`Select ${selectedClassSkills.choose} skills:`}
          skills={selectedClassSkills}
          isCheckedCheckbox={isCheckedCheckbox}
          handleToggleCheckbox={handleToggleCheckbox}
        />
      )}

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

      <Button
        title="Confirm"
        onPress={handleSubmit(onSubmit)}
        color={theme.colors.secondary}
      />
    </Container>
  );
};

export { ChangeCard };
