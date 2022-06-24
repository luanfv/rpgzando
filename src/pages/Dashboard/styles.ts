import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';

const List = styled.FlatList`
  flex: 1;

  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    padding: 0 ${theme.spacing}px ${theme.spacing}px;
  `}
` as unknown as typeof FlatList;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  ${({ theme }) => css`
    padding: ${theme.spacing}px 0;
    border-bottom-color: ${theme.colors.text};
    border-bottom-width: 0.5px;
  `}
`;

const Image = styled.Image`
  width: 55px;
  height: 55px;
`;

const Content = styled.View`
  ${({ theme }) => css`
    padding: 0 ${theme.spacing}px;
  `}
`;

const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${theme.fonts.large}px;
    font-weight: bold;
  `}
`;

const Description = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${theme.fonts.small}px;
  `}
`;

export { List, Container, Image, Content, Title, Description };
