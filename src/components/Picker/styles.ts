import styled, { css } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

const Container = styled.View`
  margin: ${({ theme }) => RFValue(theme.spacing)}px 0;
`;

const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${RFValue(theme.fonts.large)}px;
    margin-bottom: ${RFValue(theme.spacing)}px;
  `}
`;

const Select = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    border-color: ${theme.colors.textLight};
  `}

  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(4)}px;
`;

const Picture = styled.Image`
  ${({ theme }) => css`
    width: ${RFValue(theme.spacing * 3)}px;
    height: ${RFValue(theme.spacing * 3)}px;
    margin: ${RFValue(theme.spacing)}px auto;
  `}
`;

const PictureVoid = styled(Ionicons)`
  ${({ theme }) => css`
    width: ${RFValue(theme.spacing * 3)}px;
    height: ${RFValue(theme.spacing * 3)}px;
    margin: ${RFValue(theme.spacing)}px auto;
  `}
`;

const Description = styled.Text`
  ${({ theme }) => css`
    font-size: ${RFValue(theme.fonts.small)}px;
    color: ${theme.colors.textLight};
    margin-left: ${RFValue(theme.spacing / 2)}px;
  `}

  margin-top: ${RFValue(4)}px;
`;

export { Container, Title, Select, Picture, PictureVoid, Description };
