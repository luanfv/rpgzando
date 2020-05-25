import styled from 'styled-components'
import {TouchableOpacity, View} from 'react-native'

export const Header = styled(View)`
    padding: 20px 5%;
    flex-direction: row;
    justify-content: flex-end;
    background-color: #171d2b;
    border-bottom-color: rgba(255,255,255,0.1);
    border-bottom-width: 1px;
`

export const Icons = styled(TouchableOpacity)`
    margin-left: 25px;
`