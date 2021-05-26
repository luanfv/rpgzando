import styled from 'styled-components/native';
import style from '../../../styles.json';

export const Main = styled.View`
  margin: 20px;
`;

export const Container = styled.View`
  margin: 20px 0;
  border-bottom-width: 1px;
  padding-bottom: 20px;
  border-color: rgba(255, 255, 255, 0.5);
`;

export const Information = styled.View`
  margin: 8px 0;
`;

export const Title = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const TitleText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const TitleIcon = styled.TouchableOpacity`
  padding-left: 20px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const Attributes = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const AttributesContet = styled.View`
  width: 48%;
  margin-top: 12px;
`;

export const Expertise = styled.View<any>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 0 5px;
  border-radius: 2px;
  ${(props) => props.selected && 'background-color: rgba(7, 78, 65, .4)'}
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${style.primary};
  border-radius: 6px;
`;
