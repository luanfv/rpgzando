/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useCards } from '../../../../hooks/CardsContext';
import { useApp } from '../../../../hooks/AppContext';

import { professions, handleRace, IAttributes } from '../../../../utils/rules';

import Content from '../../../../components/Content';
import ProgressBar from '../../../../components/ProgressBar';
import InputNumeric from '../../../../components/InputNumeric';
import Button from '../../../../components/Button';

import { Main, Title, Container } from '../style';

const Attributes: React.FC = () => {
  const { level, profession, race, createCard } = useCards();
  const { addWarnning, selectIdCard } = useApp();
  const { navigate } = useNavigation();

  const [hp, setHp] = useState(level);
  const [force, setForce] = useState(1);
  const [constitution, setConstitution] = useState(1);
  const [dexterity, setDexterity] = useState(1);
  const [charisma, setCharisma] = useState(1);
  const [wisdom, setWisdom] = useState(1);
  const [intelligence, setIntelligence] = useState(1);
  const [benefits, setBenefits] = useState<IAttributes | undefined>();

  const fullHp = useMemo(() => {
    if (profession) {
      const found = professions.find((item) => item.id === profession.id);

      if (found) {
        return found.hp;
      }
    }

    return 0;
  }, [profession]);
  const maxHp = useMemo(() => Number(level) * Number(fullHp), [fullHp, level]);

  const submit = useCallback(() => {
    try {
      const attributes = {
        for: force,
        con: constitution,
        dex: dexterity,
        cha: charisma,
        wis: wisdom,
        int: intelligence,
      } as IAttributes;

      const response = createCard(attributes, hp);

      if (!response) {
        throw Error('Ocorreu um erro inesperado, tente novamente');
      }

      selectIdCard(response);

      navigate('showCard', { newCard: true });
    } catch (err: any) {
      if (err) {
        addWarnning(err.message);
      }
    }
  }, [
    addWarnning,
    charisma,
    constitution,
    createCard,
    dexterity,
    force,
    hp,
    intelligence,
    navigate,
    wisdom,
    selectIdCard,
  ]);

  useEffect(() => {
    if (race) {
      const attributes = handleRace(race.id);

      if (attributes) {
        setBenefits(attributes);
      }
    }
  }, [race]);

  return (
    <Content title="Nova Ficha" goBack>
      <Main>
        <ProgressBar phase={2} />

        <Container>
          <InputNumeric
            title={`HP: ${level}d${fullHp}`}
            value={Number(hp)}
            onChange={setHp}
            min={Number(level)}
            max={Number(maxHp)}
            random
          />
        </Container>

        <Title>Atributos</Title>

        <Container>
          <InputNumeric
            title={`Força ${benefits && `(+${benefits.for})`}`}
            value={force}
            onChange={setForce}
            min={1}
            max={20}
            random
          />
          <InputNumeric
            title={`Destreza ${benefits && `(+${benefits.dex})`}`}
            value={dexterity}
            onChange={setDexterity}
            min={1}
            max={20}
            random
          />
          <InputNumeric
            title={`Constituição ${benefits && `(+${benefits.con})`}`}
            value={constitution}
            onChange={setConstitution}
            min={1}
            max={20}
            random
          />
          <InputNumeric
            title={`Inteligência ${benefits && `(+${benefits.int})`}`}
            value={intelligence}
            onChange={setIntelligence}
            min={1}
            max={20}
            random
          />
          <InputNumeric
            title={`Sabedoria ${benefits && `(+${benefits.wis})`}`}
            value={wisdom}
            onChange={setWisdom}
            min={1}
            max={20}
            random
          />
          <InputNumeric
            title={`Carisma ${benefits && `(+${benefits.cha})`}`}
            value={charisma}
            onChange={setCharisma}
            min={1}
            max={20}
            random
          />
        </Container>
        <Container>
          <Button title="Continuar" icon="arrow-right" onPress={submit} />
        </Container>
      </Main>
    </Content>
  );
};

export default Attributes;
