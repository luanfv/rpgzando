import styled, { css } from 'styled-components/native';

interface IContainer {
  w?: number;
}

const Container = styled.View<IContainer>`
  margin-bottom: 16px;
  ${({ w }) =>
    w &&
    css`
      width: ${w}%;
    `};
`;

const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.fonts.medium}px;
    color: ${theme.colors.textLight};
  `}
`;

const Value = styled.Text`
  font-weight: bold;

  ${({ theme }) => css`
    font-size: ${theme.fonts.large}px;
    color: ${theme.colors.text};
  `}
`;

export { Container, Title, Value };
