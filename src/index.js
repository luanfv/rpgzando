import React from 'react'
import CreatePerson from './screens/CreatePerson'
import InsertAttr from './screens/InserAttr'
import Card from './screens/Card'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home'

export default () => <Home />

// export default () => {
//     const Stack = createStackNavigator()
//     const Options = {
//         headerShown: false,
//     }

//     return (
//         <NavigationContainer>
//             <Stack.Navigator 
//                 screenOptions={Options}
//                 initialRouteName="Criando Personagem"
//             >
//                 <Stack.Screen name="Criando Personagem" component={CreatePerson} />
//                 <Stack.Screen name="Destribuindo os Atributos" component={InsertAttr} />
//                 <Stack.Screen name="Ficha" component={Card} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }