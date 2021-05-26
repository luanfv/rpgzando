import React, { useMemo } from 'react';

import { Container, Bar, Progress, Phase, PhaseText } from './style';

interface IProps {
  phase: 1 | 2 | 3;
}

const ProgressBar: React.FC<IProps> = ({ phase }) => {
  const percent = useMemo(() => {
    if (phase === 1) {
      return '0%';
    } else if (phase === 2) {
      return '50%';
    } else {
      return '100%';
    }
  }, [phase]);

  return (
    <Container>
      <Bar />
      <Progress percent={percent} />
      <Phase completed={phase >= 1}>
        <PhaseText completed={phase >= 1}>1</PhaseText>
      </Phase>
      <Phase completed={phase >= 2}>
        <PhaseText completed={phase >= 2}>2</PhaseText>
      </Phase>
      <Phase completed={phase >= 3}>
        <PhaseText completed={phase >= 3}>3</PhaseText>
      </Phase>
    </Container>
  );
};

export default ProgressBar;
