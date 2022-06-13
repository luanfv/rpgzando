import styled, { css } from 'styled-components/native';

const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    border-color: ${theme.colors.textLight};
    margin-bottom: ${theme.spacing * 2}px;
  `}

  border-width: 1px;
  border-radius: 4px;
`;

export { Container };
