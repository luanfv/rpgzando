import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IIcon {
  width?: number;
  margin?: number;
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.ActivityIndicator<IIcon>`
  ${({ width }) =>
    width &&
    css`
      width: ${RFValue(width)}px;
    `}

  ${({ margin }) =>
    margin &&
    css`
      width: ${RFValue(margin)}px;
    `}
`;

export { Container, Icon };
