import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cards from '../pages/Cards';
import About from '../pages/About';
import Settings from '../pages/Settings';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="collectors"
    >
      <Stack.Screen name="cards" component={Cards} />
      <Stack.Screen name="about" component={About} />
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default Routes;