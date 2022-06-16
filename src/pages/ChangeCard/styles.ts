import styled, { css } from 'styled-components/native';

const Container = styled.ScrollView`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    padding: 0 ${theme.spacing}px;
  `}
`;

export { Container };
