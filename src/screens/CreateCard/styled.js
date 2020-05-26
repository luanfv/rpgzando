import styled from 'styled-components'
import {Image, View} from 'react-native'
import {Picker} from '@react-native-community/picker'

export const Images = styled(Image)`
    width: 80px;
    height: 80px;
    margin: auto;
`

export const FlexRow = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 0 5px;
    border-radius: 2px;
    ${props => props.selected && 'background-color: rgba(78, 173, 99, .1)'}
`

export const Select = styled(Picker)`
    color: #d9dbde;
    font-size: 20px;
    background-color: rgba(255, 255, 255, .1);
    margin: 10px 0;
`