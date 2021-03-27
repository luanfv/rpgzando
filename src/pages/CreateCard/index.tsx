import React, { useRef, useState, useCallback } from 'react';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';

import { races, professions } from '../../utils/rules';
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
  SelectText,
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
    const findProfession = professions.find(
      (_profession) => _profession.id === key,
    );

    if (findProfession) {
      setProfession(findProfession);
    }
  }, []);

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
              <SelectText>{race.desc}</SelectText>
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
              <SelectText>HP: 1d{profession.hp} (por nível)</SelectText>
            </Container>
          </Container>
        </Form>
      </Main>
    </Content>
  );
};

export default CreateCard;
