import React, { useMemo, useState } from 'react';

import { useCards } from '../../../../hooks/CardsContext';

import { professions } from '../../../../utils/rules';

import Content from '../../../../components/Content';
import ProgressBar from '../../../../components/ProgressBar';
import InputNumeric from '../../../../components/InputNumeric';

import { Main } from './style';

const Attributes: React.FC = () => {
  const { level, profession } = useCards();

  const [hp, setHp] = useState(level as Number);

  const fullHp = useMemo(() => {
    const found = professions.find(
      (_profession) => _profession.id === profession.id,
    );

    return Number(found?.hp);
  }, [profession.id]);
  const maxHp = useMemo(() => Number(level) * Number(fullHp), [fullHp, level]);

  return (
    <Content title="Nova Ficha" goBack>
      <Main>
        <ProgressBar phase={2} />

        <InputNumeric
          title={`HP: ${level}d${fullHp}`}
          value={Number(hp)}
          onChange={setHp}
          min={Number(level)}
          max={Number(maxHp)}
          random
        />
      </Main>
    </Content>
  );
};

export default Attributes;
