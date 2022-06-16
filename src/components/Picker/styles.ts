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

const Select = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    border-color: ${theme.colors.textLight};
  `}

  border-width: 1px;
  border-radius: 4px;
`;

const Picture = styled.Image`
  ${({ theme }) => css`
    width: ${theme.spacing * 3}px;
    height: ${theme.spacing * 3}px;
    margin: ${theme.spacing}px auto;
  `}
`;

const Description = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.fonts.small}px;
    color: ${theme.colors.textLight};
    margin-left: ${theme.spacing / 2}px;
  `}

  margin-top: 4px;
`;

export { Container, Title, Select, Picture, Description };
