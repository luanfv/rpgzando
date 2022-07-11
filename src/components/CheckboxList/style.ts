import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Container = styled.View`
  margin: ${({ theme }) => theme.spacing}px 0;
`;

const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${RFValue(theme.fonts.large)}px;
    margin-bottom: ${RFValue(theme.spacing)}px;
  `}
`;

export { Container, Title };
