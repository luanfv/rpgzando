import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Column = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ColumnItem = styled.View`
  width: 45%;
`;

const Title = styled.Text`
  font-weight: bold;
  text-transform: uppercase;

  ${({ theme }) => css`
    font-size: ${RFValue(theme.fonts.large)}px;
    color: ${theme.colors.text};
    margin-top: ${RFValue(theme.spacing * 2)}px;
  `}
`;

const MarginBottom = styled.View`
  margin-bottom: ${({ theme }) => RFValue(theme.spacing * 2)}px;
`;

export { Column, ColumnItem, Title, MarginBottom };
