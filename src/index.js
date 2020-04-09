import React from 'react'
import {View, Text} from 'react-native'
import {handleRace} from './helpers/rules'

export default () => 
{
    console.log(handleRace(1, 1))
    console.log(handleRace(2))
    console.log(handleRace(3, 2))
    console.log(handleRace(4, 2))
    console.log(handleRace(5, 1))
    console.log(handleRace(6, 7))
    console.log(handleRace(1, 3))
    return (
        <View>
            <Text>Hey, it's my app of RPG!</Text>
        </View>
    )
}