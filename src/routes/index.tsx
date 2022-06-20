import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { ChangeCard, Card } from '@src/pages';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="ChangeCard"
          component={gestureHandlerRootHOC(ChangeCard)}
        />

        <Stack.Screen name="Card" component={gestureHandlerRootHOC(Card)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Routes };
