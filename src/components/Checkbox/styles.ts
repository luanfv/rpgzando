import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ICheckbox {
  selected?: boolean;
}

const Container = styled.TouchableOpacity<ICheckbox>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${RFValue(5)}px 0;
  padding: 0 ${RFValue(5)}px;
  border-radius: 2px;

  ${({ selected }) =>
    selected &&
    css`
      background-color: rgba(7, 78, 65, 0.2);
    `}
`;

const Text = styled.Text<ICheckbox>`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => RFValue(theme.fonts.medium)}px;

  ${({ selected }) =>
    selected &&
    css`
      font-weight: bold;
    `}
`;

export { Container, Text };
