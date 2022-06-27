import styled, { css } from 'styled-components/native';

const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  padding: 20px;
  border-radius: 2px;
`;

const Title = styled.Text`
  text-align: center;
  font-weight: bold;

  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${theme.fonts.large}px;
  `}
`;

const Description = styled.Text`
  margin: 20px 0;

  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${theme.fonts.medium}px;
  `}
`;

const Buttons = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.View`
  width: 48%;
`;

export { Container, Title, Description, Buttons, ButtonContainer };
