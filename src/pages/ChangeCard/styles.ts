import styled, { css } from 'styled-components/native';

const Container = styled.ScrollView`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    padding: ${theme.spacing}px;
  `}
`;

export { Container };
