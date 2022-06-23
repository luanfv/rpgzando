import styled, { css } from 'styled-components/native';

const Scroll = styled.ScrollView`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
  `}
`;

const Container = styled.View`
  flex: 1;

  ${({ theme }) => css`
    margin: ${theme.spacing}px;
  `}
`;

export { Scroll, Container };
