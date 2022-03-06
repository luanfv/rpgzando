/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState, useCallback } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { races, professions, IExpertise } from '../../../utils/rules';
import getValidationErrors from '../../../utils/getValidationErrors';

import { useApp } from '../../../hooks/AppContext';
import { useCards } from '../../../hooks/CardsContext';

import Content from '../../../components/Content';
import ProgressBar from '../../../components/ProgressBar';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {
  Main,
  Container,
  Title,
  SelectImageContainer,
  SelectImage,
  SelectContainer,
  Select,
  Text,
  Expertise,
} from './style';

interface IHandleSubmit {
  name: string;
  level: string;
}

const CreateCard: React.FC = () => {
  const { addWarnning } = useApp();
  const { createCharacter } = useCards();
  const { navigate } = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const [race, setRace] = useState(races[0]);
  const [profession, setProfession] = useState(professions[0]);

  const handleRaceSelected = useCallback((key) => {
    const raceSelected = races.find((item) => item.id === key);

    if (raceSelected) {
      setRace(raceSelected);
    }
  }, []);

  const handleProfessionSelected = useCallback((key) => {
    let expertisesReseted: IExpertise[] = [];

    const findProfession = professions.find((item) => {
      if (item.id === key) {
        expertisesReseted = item.expertises.map((value) => {
          return { ...value, checked: false };
        });

        return { ...item, expertises: expertisesReseted };
      }
    });

    if (findProfession) {
      setProfession({ ...findProfession, expertises: expertisesReseted });
    }
  }, []);

  const alterCheck = useCallback(
    (item) => {
      const newExpertises = profession.expertises;
      newExpertises[item].checked = !newExpertises[item].checked;

      setProfession({ ...profession, expertises: newExpertises });
    },
    [profession],
  );

  const handleSubmit = useCallback(
    async (data: IHandleSubmit) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Seu personagem precisa de um nome.'),
          level: Yup.string().required('Seu personagem precisa de um nível.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, level } = data;

        if (!Number(level) || !Number.isInteger(Number(level))) {
          throw Error('Number');
        }

        const persoExpertises: number[] = [];

        profession.expertises.forEach((item) => {
          if (item.checked) {
            persoExpertises.push(item.id);
          }
        });

        if (persoExpertises.length !== profession.quantityExpertise) {
          throw new Error(
            `Você precisar escolher exatamente ${profession.quantityExpertise} perícias.`,
          );
        }

        const response = createCharacter({
          name,
          level: Number(level),
          profession,
          expertises: persoExpertises,
          race: {
            name: race.name,
            id: race.id,
          },
        });

        if (!response) {
          return;
        }

        navigate('createAttributes');
      } catch (err: any) {
        if (err instanceof Yup.ValidationError) {
          const errors: { name?: string; level?: string } = getValidationErrors(
            err,
          );

          if (errors.name) {
            addWarnning(errors.name);
          } else if (errors.level) {
            addWarnning(errors.level);
          }

          formRef.current?.setErrors(errors);
        } else if (err.message === 'Number') {
          addWarnning('Informe um número inteiro em seu nível.');

          formRef.current?.setErrors({
            level: 'Informe um número inteiro em seu nível.',
          });
        } else {
          const { message } = err;

          addWarnning(message);
        }
      }
    },
    [addWarnning, createCharacter, navigate, profession, race.id, race.name],
  );

  return (
    <Content title="Nova Ficha" goBack>
      <Main>
        <ProgressBar phase={1} />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Container>
            <Title>Informações do base</Title>
            <Container>
              <Container>
                <Input
                  autoCorrect={false}
                  name="name"
                  icon="user"
                  placeholder="Nome"
                />
              </Container>

              <Container>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  name="level"
                  icon="award"
                  placeholder="Nível"
                />
              </Container>

              <Container>
                <SelectImageContainer>
                  <SelectImage source={race.image} />
                </SelectImageContainer>

                <SelectContainer>
                  <Select
                    selectedValue={Number(race.id)}
                    onValueChange={(value) => handleRaceSelected(value)}
                  >
                    {races.map((value) => (
                      <Select.Item
                        key={String(value.id)}
                        value={value.id}
                        label={value.name}
                      />
                    ))}
                  </Select>
                </SelectContainer>
                <Text>{race.desc}</Text>
              </Container>

              <Container>
                <SelectImageContainer>
                  <SelectImage source={profession.image} />
                </SelectImageContainer>

                <SelectContainer>
                  <Select
                    selectedValue={Number(profession.id)}
                    onValueChange={(value) => handleProfessionSelected(value)}
                  >
                    {professions.map((value) => (
                      <Select.Item
                        key={String(value.id)}
                        value={value.id}
                        label={value.name}
                      />
                    ))}
                  </Select>
                </SelectContainer>
                <Text>HP: 1d{profession.hp} (por nível)</Text>
              </Container>
            </Container>

            <Title>Perícias (escolha {profession.quantityExpertise})</Title>
            <Container>
              {profession.expertises &&
                profession.expertises.map((value, key) => {
                  return (
                    <Expertise selected={value.checked} key={String(value.id)}>
                      <Text>{value.desc}</Text>
                      <CheckBox
                        value={Boolean(value.checked)}
                        onChange={() => alterCheck(key)}
                      />
                    </Expertise>
                  );
                })}
            </Container>

            <Container>
              <Button
                title="Continuar"
                icon="arrow-right"
                onPress={() => formRef.current?.submitForm()}
              />
            </Container>
          </Container>
        </Form>
      </Main>
    </Content>
  );
};

export default CreateCard;
