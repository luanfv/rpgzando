import React, { useRef, useState, useCallback } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { races, professions, IExpertise } from '../../utils/rules';
import Content from '../../components/Content';
import ProgressBar from '../../components/ProgressBar';
import Input from '../../components/Input';

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

const CreateCard: React.FC = () => {
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

  return (
    <Content title="Nova Ficha" goBack>
      <Main>
        <ProgressBar phase={1} />

        <Form ref={formRef} onSubmit={() => console.log('submit')}>
          <Container>
            <Title>Informações do base</Title>
            <Container>
              <Input title="Nome" />
              <Input title="Nível" keyboardType="numeric" />

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
          </Container>
        </Form>
      </Main>
    </Content>
  );
};

export default CreateCard;
