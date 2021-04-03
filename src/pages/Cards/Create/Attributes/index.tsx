import React, { useMemo } from 'react';

import { useCards } from '../../../../hooks/CardsContext';

import { professions } from '../../../../utils/rules';

import Content from '../../../../components/Content';
import ProgressBar from '../../../../components/ProgressBar';
import InputNumeric from '../../../../components/InputNumeric';

import { Main } from './style';

const Attributes: React.FC = () => {
  const { level, profession } = useCards();

  const fullHp = useMemo(() => {
    const found = professions.find(
      (_profession) => _profession.id === profession.id,
    );

    return found?.hp;
  }, [profession.id]);

  return (
    <Content title="Nova Ficha" goBack>
      <Main>
        <ProgressBar phase={2} />

        <InputNumeric title={`HP: ${level}d${fullHp}`} random />
      </Main>
    </Content>
  );
};

export default Attributes;
