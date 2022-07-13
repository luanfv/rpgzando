import styled, { css } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface ICard {
  isMain?: boolean;
}

const Container = styled.TouchableOpacity<ICard>`
  ${({ theme, isMain }) => css`
    width: ${RFPercentage(45) - RFValue(theme.spacing)}px;
    padding: ${RFValue(theme.spacing)}px;
    padding-bottom: ${RFValue(theme.spacing * 2)}px;
    margin: ${RFValue(theme.spacing)}px;
    background-color: ${isMain ? theme.colors.secondary : theme.colors.text};
    border-radius: ${RFValue(5)}px;
  `}

  flex-direction: row;
`;

const Icon = styled(Ionicons)<ICard>`
  ${({ theme, isMain }) => css`
    font-size: ${RFValue(theme.fonts.large * 2)}px;
    color: ${isMain ? theme.colors.text : theme.colors.primary};
  `}

  font-weight: bold;
`;

const Description = styled.View`
  ${({ theme }) => css`
    margin-left: ${RFValue(theme.spacing)}px;
    padding-right: ${RFValue(theme.spacing)}px;
  `}
`;

const Title = styled.Text<ICard>`
  ${({ theme, isMain }) => css`
    font-size: ${RFValue(theme.fonts.large)}px;
    color: ${isMain ? theme.colors.text : theme.colors.primary};
    margin-bottom: ${RFValue(theme.spacing / 2)}px;
  `}

  font-weight: bold;
`;

const Message = styled.Text<ICard>`
  ${({ theme, isMain }) => css`
    font-size: ${RFValue(theme.fonts.small)}px;
    color: ${isMain ? theme.colors.text : theme.colors.primary};
  `}
`;

export { Container, Icon, Description, Title, Message };
