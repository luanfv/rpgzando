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
import { Column, ColumnItem, MarginBottom, Title } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('You need to have a name!'),
  class: Yup.string().required(),
  race: Yup.string().required(),

  notes: Yup.string(),
});

const FormCard: React.FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
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
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 0,
      deception: 0,
      history: 0,
      insight: 0,
      intimidation: 0,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleight: 0,
      stealth: 0,
      survival: 0,
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
        if (params && params.email === user.email) {
          const updatedCard = await serviceCards.update(
            { ...data, id: params.id, userUid: user.uid },
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

        const newCard = await serviceCards.post(
          { ...data, email: String(user.email), userUid: user.uid },
          language.type,
        );

        reset({
          routes: [{ name: 'Dashboard' }, { name: 'Card', params: newCard }],
          index: 1,
        });
      }
    },
    [language, params, reset, user],
  );

  const handleChangeAttribute = useCallback(
    (
      attribute: 'for' | 'dex' | 'con' | 'int' | 'wis' | 'cha',
      action: () => void,
    ) => {
      action();

      switch (attribute) {
        case 'for':
          const modifierFor = getValues('for');
          const valueFor = (modifierFor - 10) / 2;

          setValue('athletics', valueFor);

          break;

        case 'dex':
          const modifierDex = getValues('dex');
          const valueDex = (modifierDex - 10) / 2;

          setValue('acrobatics', valueDex);
          setValue('stealth', valueDex);
          setValue('sleight', valueDex);

          break;

        case 'int':
          const modifierInt = getValues('int');
          const valueInt = (modifierInt - 10) / 2;

          setValue('arcana', valueInt);
          setValue('history', valueInt);
          setValue('nature', valueInt);
          setValue('religion', valueInt);

          break;

        case 'wis':
          const modifierWis = getValues('wis');
          const valueWis = (modifierWis - 10) / 2;

          setValue('animalHandling', valueWis);
          setValue('perception', valueWis);
          setValue('medicine', valueWis);
          setValue('survival', valueWis);
          setValue('insight', valueWis);

          break;

        case 'cha':
          const modifierCha = getValues('cha');
          const valueCha = (modifierCha - 10) / 2;

          setValue('deception', valueCha);
          setValue('intimidation', valueCha);
          setValue('performance', valueCha);
          setValue('persuasion', valueCha);

          break;

        default:
          break;
      }
    },
    [getValues, setValue],
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
      setValue('notes', params.notes);
      setValue('level', params.level);

      setValue('acrobatics', params.skills.acrobatics);
      setValue('animalHandling', params.skills.animalHandling);
      setValue('arcana', params.skills.arcana);
      setValue('athletics', params.skills.athletics);
      setValue('deception', params.skills.deception);
      setValue('history', params.skills.history);
      setValue('insight', params.skills.insight);
      setValue('intimidation', params.skills.intimidation);
      setValue('investigation', params.skills.investigation);
      setValue('medicine', params.skills.medicine);
      setValue('nature', params.skills.nature);
      setValue('perception', params.skills.perception);
      setValue('performance', params.skills.performance);
      setValue('persuasion', params.skills.persuasion);
      setValue('religion', params.skills.religion);
      setValue('sleight', params.skills.sleight);
      setValue('stealth', params.skills.stealth);
      setValue('survival', params.skills.survival);
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

        <Title>{language.pages.FormCard.attributes}</Title>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.attributes.for}
                  value={value}
                  onChange={(attribute) =>
                    handleChangeAttribute('for', () => onChange(attribute))
                  }
                  onBlur={onBlur}
                  min={1}
                  max={20}
                  random
                />
              )}
              name="for"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.attributes.int}
                  value={value}
                  onChange={(attribute) =>
                    handleChangeAttribute('int', () => onChange(attribute))
                  }
                  onBlur={onBlur}
                  min={1}
                  max={20}
                  random
                />
              )}
              name="int"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.attributes.dex}
                  value={value}
                  onChange={(attribute) =>
                    handleChangeAttribute('dex', () => onChange(attribute))
                  }
                  onBlur={onBlur}
                  min={1}
                  max={20}
                  random
                />
              )}
              name="dex"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.attributes.wis}
                  value={value}
                  onChange={(attribute) =>
                    handleChangeAttribute('wis', () => onChange(attribute))
                  }
                  onBlur={onBlur}
                  min={1}
                  max={20}
                  random
                />
              )}
              name="wis"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.attributes.con}
                  value={value}
                  onChange={(attribute) =>
                    handleChangeAttribute('con', () => onChange(attribute))
                  }
                  onBlur={onBlur}
                  min={1}
                  max={20}
                  random
                />
              )}
              name="con"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.attributes.cha}
                  value={value}
                  onChange={(attribute) =>
                    handleChangeAttribute('cha', () => onChange(attribute))
                  }
                  onBlur={onBlur}
                  min={1}
                  max={20}
                  random
                />
              )}
              name="cha"
            />
          </ColumnItem>
        </Column>

        <Title>Skills:</Title>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.acrobatics}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="acrobatics"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.animalHandling}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="animalHandling"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.arcana}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="arcana"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.athletics}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="athletics"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.deception}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="deception"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.history}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="history"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.insight}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="insight"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.intimidation}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="intimidation"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.investigation}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="investigation"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.medicine}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="medicine"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.nature}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="nature"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.perception}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="perception"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.performance}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="performance"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.persuasion}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="persuasion"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.religion}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="religion"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.sleight}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="sleight"
            />
          </ColumnItem>
        </Column>

        <Column>
          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.stealth}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="stealth"
            />
          </ColumnItem>

          <ColumnItem>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputNumeric
                  title={language.skills.survival}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  min={-20}
                  max={20}
                />
              )}
              name="survival"
            />
          </ColumnItem>
        </Column>

        <MarginBottom />

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
