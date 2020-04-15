import styled from 'styled-components'
import {ScrollView ,View, Text, Image, TextInput} from 'react-native'
import {Picker} from '@react-native-community/picker'

export const Background = styled(ScrollView)`
    background-color: #171d2b;
    width: 100%;
    height: 100%;
    padding: 0 10%;
`

export const Container = styled(View)`
    width: 100%;
    margin: 20px 0 40px;
`

export const Select = styled(Picker)`
    color: #d9dbde;
    font-size: 20px;
    background-color: rgba(255, 255, 255, .1);
    margin: 10px 0;
`

export const TextStyled = styled(Text)`
    font-size: 16px;
    color: #d9dbde;
`

export const Title = styled(Text)`
    font-size: 20px;
    text-align: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 800;
    color: #4ead63;
    margin-bottom: 20px;
`

export const Images = styled(Image)`
    width: 80px;
    height: 80px;
    margin: auto;
`

export const FlexRow = styled(View)`
    flex-direction: row;
    align-items: center;
    margin: 5px 0;
`
///
export const Attribute = styled(View)`
    height: 140px;
    justify-content: space-between;
    margin-bottom: 20px;
`

export const AttributeInput = styled(TextInput)`
    color: #d9dbde;
    font-size: 20px;
    background-color: rgba(255, 255, 255, .1);
    margin: 10px 0;
    text-align: center;
`