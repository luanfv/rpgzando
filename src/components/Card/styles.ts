import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

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

export { Container, Image, Content, Title, Description };
