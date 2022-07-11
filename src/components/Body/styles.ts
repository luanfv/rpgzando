import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Scroll = styled.ScrollView`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
  `}
`;

const Container = styled.View`
  flex: 1;

  ${({ theme }) => css`
    margin: ${RFValue(theme.spacing)}px;
  `}
`;

export { Scroll, Container };
