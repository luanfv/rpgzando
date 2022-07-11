import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Columns = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${RFValue(20)}px;
`;

const Image = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  margin: ${RFValue(20)}px auto;
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

export { Columns, Image, Title };
