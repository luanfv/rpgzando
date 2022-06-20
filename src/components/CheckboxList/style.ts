import styled, { css } from 'styled-components/native';

const Container = styled.View`
  margin: ${({ theme }) => theme.spacing}px 0;
`;

const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${theme.fonts.large}px;
    margin-bottom: ${theme.spacing}px;
  `}
`;

export { Container, Title };
