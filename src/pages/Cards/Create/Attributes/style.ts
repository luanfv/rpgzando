import styled from 'styled-components/native';
import InputSpinner from 'react-native-input-spinner';

export const Main = styled.View`
  margin: 20px;
`;

export const InputNumeric = styled(InputSpinner)`
  border-radius: 0;
  border-bottom-width: 1px;
  border-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  padding-bottom: 6px;
`;
