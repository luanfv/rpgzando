import React, { useRef, useState, useCallback } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { races, professions, IExpertise } from '../../utils/rules';
import getValidationErrors from '../../utils/getValidationErrors';

import { useModal } from '../../hooks/ModalContext';

import Content from '../../components/Content';
import ProgressBar from '../../components/ProgressBar';
import Input from '../../components/Input';
import Button from '../../components/Button';

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
  const { addWarnning } = useModal();
  const formRef = useRef<FormHandles>(null);

  const [race, setRace] = useState(races[0]);
  const [profession, setProfession] = useState(professions[0]);

  const handleRaceSelected = useCallback((key) => {
    const raceSelected = races.find((_race) => _race.id === key);

    if (raceSelected) {
      setRace(raceSelected);
    }
  }, []);

  const handleProfessionSelected = useCallback((key) => {
    let expertisesReseted: IExpertise[] = [];

    const findProfession = professions.find((_profession) => {
      if (_profession.id === key) {
        expertisesReseted = _profession.expertises.map((_expertise) => {
          return { ..._expertise, checked: false };
        });

        return { ..._profession, expertises: expertisesReseted };
      }
    });

    if (findProfession) {
      setProfession({ ...findProfession, expertises: expertisesReseted });
    }
  }, []);

  const alterCheck = useCallback(
    (_position) => {
      const newExpertises = profession.expertises;
      newExpertises[_position].checked = !newExpertises[_position].checked;

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
          throw Error('Informe um número inteiro em seu nível.');
        }

        let quantityExpertise: Number = 0;

        profession.expertises.forEach((_expertise) => {
          if (_expertise.checked) {
            quantityExpertise = Number(quantityExpertise) + 1;
          }
        });

        if (quantityExpertise !== profession.quantityExpertise) {
          throw new Error(
            `Você precisar escolher exatamente ${profession.quantityExpertise} perícias.`,
          );
        }

        console.log(`Só falta cadastrar o ${name}, nível ${level}.`);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors: { name?: String; level?: String } = getValidationErrors(
            err,
          );

          if (errors.name) {
            addWarnning(errors.name);
          } else if (errors.level) {
            addWarnning(errors.level);
          }

          formRef.current?.setErrors(errors);
        } else {
          const { message } = err;

          addWarnning(message);

          formRef.current?.setErrors({ level: message });
        }
      }
    },
    [addWarnning, profession],
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
                        value={Number(value.id)}
                        label={String(value.name)}
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
                        value={Number(value.id)}
                        label={String(value.name)}
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
