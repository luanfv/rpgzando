import styled, { css } from 'styled-components/native';

const Container = styled.View`
  flex: 1;

  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    padding: ${theme.spacing}px;
  `}
`;

export { Container };
