import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ICard {
  isMain?: boolean;
}

const Container = styled.TouchableOpacity<ICard>`
  width: 300px;
  height: 130px;
  padding: ${({ theme }) => theme.spacing}px;
  margin: ${({ theme }) => theme.spacing}px;
  background-color: ${({ theme, isMain }) =>
    isMain ? theme.colors.secondary : theme.colors.text};
  border-radius: 5px;
  flex-direction: row;
`;

const Icon = styled(Ionicons)<ICard>`
  font-size: ${({ theme }) => theme.fonts.large * 2}px;
  color: ${({ theme, isMain }) =>
    isMain ? theme.colors.text : theme.colors.primary};
  font-weight: bold;
`;

const Description = styled.View`
  margin-left: ${({ theme }) => theme.spacing}px;
  padding-right: ${({ theme }) => theme.spacing}px;
`;

const Title = styled.Text<ICard>`
  font-size: ${({ theme }) => theme.fonts.large}px;
  color: ${({ theme, isMain }) =>
    isMain ? theme.colors.text : theme.colors.primary};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing / 2}px;
`;

const Message = styled.Text<ICard>`
  font-size: ${({ theme }) => theme.fonts.small}px;
  color: ${({ theme, isMain }) =>
    isMain ? theme.colors.text : theme.colors.primary};
`;

export { Container, Icon, Description, Title, Message };
