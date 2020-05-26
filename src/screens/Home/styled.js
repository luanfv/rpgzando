import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import styled from 'styled-components'

export const Background = styled(ScrollView)`
    width: 100%;
    height: 100%;
    background-color: #171d2b;
`

export const Header = styled(View)`
    background-color: rgba(255, 255, 255, 0.1);
    width: 100%;
    height: 300px;
    align-items: center;
    justify-content: center;
`

export const HeaderLogo = styled(Image)`
    border-radius: 4px;
    width: 75px;
    height: 75px;
`

export const HeaderTxt = styled(Text)`
    font-size: 24px;
    color: #4ead63;
    font-weight: bold;
`

export const Main = styled(View)`
    background-color: #171d2b;
    width: 100%;
    height: 72%;
    margin-top: -3%;
    border-radius: 15px;
    padding: 40px 0% 40px;
`
export const Content = styled(View)`
    width: 90%;
    margin: 0 auto;
`

export const Card = styled(TouchableOpacity)`
    flex-direction: row;
    margin: 20px auto;
    width: 90%;
`

export const Class = styled(Image)`
    width: 75px;
    height: 75px;
    margin-right: 20px;
    border-radius: 4px;
`

export const Txt = styled(Text)`
    font-size: ${props => props.fontsize ? props.fontsize : '16'}px;
    color: ${props => props.color ? props.color : '#fff'};
    font-weight: bold;
    width: 210px;
    letter-spacing: 1px;
`