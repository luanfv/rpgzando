import styled from 'styled-components'
import {ScrollView ,View, Text, Image, TextInput, TouchableOpacity} from 'react-native'

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

export const ContainerInfo = styled(View)`
    width: ${props => props.width ? props.width : '100'}%;
    margin-bottom: 20px;
`

export const TextStyled = styled(Text)`
    font-size: ${props => props.fontsize ? props.fontsize : '16'}px;
    color: ${props => props.color ? props.color : '#d9dbde'};
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
`

export const Title = styled(Text)`
    font-size: 20px;
    text-align: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: bold;
    color: #4ead63;
    margin-bottom: 20px;
`

export const Attribute = styled(View)`
    height: 140px;
    justify-content: space-between;
    margin-bottom: 20px;
`

export const Input = styled(TextInput)`
    color: #d9dbde;
    font-size: 20px;
    background-color: rgba(255, 255, 255, .1);
    margin: 10px 0;
    padding: 10px;
    text-align: ${props => props.align ? props.align : 'center'};
`

export const Button = styled(TouchableOpacity)`
    padding: 15px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.background ? props.background : '#570a0a'};
    margin-bottom: ${props => props.bottom ? props.bottom : '20'}px;
    margin-top: ${props => props.top ? props.top : '0'}px;
    flex-direction: row;
`

export const Column2 = styled(View)`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    ${props => props.marginBottom ? `margin-bottom: ${props.marginBottom}px;` : ''}
`

export const ModalContainer = styled(View)`
    background-color: #171d2b;
    width: 100%;
    height: 300px;
    padding: 5%;
    justify-content: space-between;
    align-content: center;
    border-radius: 4px;
`