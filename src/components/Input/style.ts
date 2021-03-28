import styled, { css } from 'styled-components/native';

import styles from '../../styles.json';

interface ContainerProps {
  isFocus: boolean;
  isError: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: ${styles.bg};
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.5);
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.isError &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocus &&
    css`
      border-color: ${styles.secondary};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  padding-left: 16px;
`;
