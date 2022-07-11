import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface IContainer {
  w?: number;
}

const Container = styled.View<IContainer>`
  margin-bottom: ${RFValue(16)}px;
  ${({ w }) =>
    w &&
    css`
      width: ${w}%;
    `};
`;

const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(theme.fonts.medium)}px;
    color: ${theme.colors.textLight};
  `}
`;

const Value = styled.Text`
  font-weight: bold;

  ${({ theme }) => css`
    font-size: ${RFValue(theme.fonts.large)}px;
    color: ${theme.colors.text};
  `}
`;

export { Container, Title, Value };
