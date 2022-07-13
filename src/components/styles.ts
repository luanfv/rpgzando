import { FlatList, Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

const BottomSpace = styled.View`
  ${({ theme }) =>
    Platform.OS === 'ios' &&
    css`
      width: 100%;
      height: ${getBottomSpace()}px;
      background-color: ${theme.colors.primary};
    `}
`;

const MarginBottom = styled.View`
  ${({ theme }) => css`
    margin-bottom: ${RFValue(theme.spacing)}px;
  `}
`;

const CharacterPhoto = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  margin: ${RFValue(20)}px auto;
`;

const List = styled.FlatList`
  flex: 1;

  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    padding: 0 ${RFValue(theme.spacing)}px ${RFValue(theme.spacing)}px;
  `}
` as unknown as typeof FlatList;

export { BottomSpace, MarginBottom, CharacterPhoto, List };
