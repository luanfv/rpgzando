import React from 'react';

import { Container, Bar, Progress, Phase, PhaseText } from './style';

const ProgressBar: React.FC = () => {
  return (
    <Container>
      <Bar />
      <Progress />
      <Phase completed>
        <PhaseText completed>1</PhaseText>
      </Phase>
      <Phase completed>
        <PhaseText completed>2</PhaseText>
      </Phase>
      <Phase>
        <PhaseText>3</PhaseText>
      </Phase>
    </Container>
  );
};

export default ProgressBar;
