import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

const Columns = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${RFValue(20)}px;
`;

const Image = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  margin: ${RFValue(20)}px auto;
`;

export { Columns, Image };
