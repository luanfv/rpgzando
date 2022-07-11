import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

const List = styled.FlatList`
  flex: 1;

  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    padding: 0 ${RFValue(theme.spacing)}px ${RFValue(theme.spacing)}px;
  `}
` as unknown as typeof FlatList;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  ${({ theme }) => css`
    padding: ${RFValue(theme.spacing)}px 0;
    border-bottom-color: ${theme.colors.text};
    border-bottom-width: 0.5px;
  `}
`;

const Image = styled.Image`
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;
`;

const Content = styled.View`
  ${({ theme }) => css`
    padding: 0 ${RFValue(theme.spacing)}px;
  `}
`;

const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${RFValue(theme.fonts.large)}px;
    font-weight: bold;
  `}
`;

const Description = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${RFValue(theme.fonts.small)}px;
  `}
`;

const MarginBottom = styled.View`
  ${({ theme }) => css`
    margin-bottom: ${RFValue(theme.spacing)}px;
  `}
`;

export { Container, Content, Description, Image, List, Title, MarginBottom };
