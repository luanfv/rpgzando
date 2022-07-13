import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Title = styled.Text`
  font-weight: bold;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-size: ${RFValue(theme.fonts.large)}px;
    color: ${theme.colors.text};
    margin-top: ${RFValue(theme.spacing * 2)}px;
    margin-bottom: ${RFValue(theme.spacing)}px;
  `}
`;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${RFValue(20)}px;
`;

const Item = styled.View`
  width: 45%;
`;

export { Container, Title, Item };
