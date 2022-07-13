import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Container = styled.View`
  margin-bottom: ${RFValue(16)}px;
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
