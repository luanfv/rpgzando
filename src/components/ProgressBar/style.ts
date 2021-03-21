import styled from 'styled-components/native';
import styles from '../../styles.json';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Bar = styled.View`
  position: absolute;
  height: 3px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const Progress = styled.View`
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: ${styles.secondary};
`;

export const Phase = styled.View<any>`
  width: 45px;
  height: 45px;
  border-radius: 25px;
  background-color: ${({ completed }) =>
    completed ? styles.secondary : '#fff'};
  align-items: center;
  justify-content: center;
`;

export const PhaseText = styled.Text<any>`
  font-size: 18px;
  font-weight: bold;
  color: ${({ completed }) => (completed ? '#fff' : styles.secondary)};
`;
