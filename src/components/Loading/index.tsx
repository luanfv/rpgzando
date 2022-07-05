import React from 'react';
import { useTheme } from 'styled-components';

import { ILoading } from '@src/types/components';
import { Container, Icon } from './styles';

const Loading: React.FC<ILoading> = ({ width, margin }) => {
  const { colors } = useTheme();

  return (
    <Container>
      <Icon width={width} margin={margin} color={colors.text} size="large" />
    </Container>
  );
};

export { Loading };
