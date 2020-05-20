import React from 'react'
import {StatusBar} from 'react-native'
import CreatePerson from './screens/CreatePerson'
import InsertAttr from './screens/InserAttr'
import Card from './screens/Card'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home'

const Stack = createStackNavigator()
const Options = {
    headerShown: false,
}

export default () => 
{
    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#171d2b" />
            <Stack.Navigator 
                screenOptions={Options}
                initialRouteName="Home"
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Nova Ficha" component={CreatePerson} />
                <Stack.Screen name="Atributos" component={InsertAttr} />
                <Stack.Screen name="Ficha" component={Card} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}