import styled, { css } from 'styled-components/native';

interface IContainer {
  selected?: boolean;
}

const Container = styled.TouchableOpacity<IContainer>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 0 5px;
  border-radius: 2px;

  ${({ selected }) =>
    selected &&
    css`
      background-color: rgba(7, 78, 65, 0.2);
    `}
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fonts.medium}px;
`;

export { Container, Text };
