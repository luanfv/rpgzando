import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const BottomSpace = styled.View`
  ${({ theme }) =>
    Platform.OS === 'ios' &&
    css`
      width: 100%;
      height: ${getBottomSpace()}px;
      background-color: ${theme.colors.primary};
    `}
`;

export { BottomSpace };
