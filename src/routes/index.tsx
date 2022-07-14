import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { FormCard, Card, Auth, Dashboard, SearchCard } from '@src/pages';
import { useContextUser } from '@src/contexts';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const { authStatus } = useContextUser();

  if (authStatus === 'loading') {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (authStatus === 'unauthorized') {
    return <Auth />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Dashboard"
          component={gestureHandlerRootHOC(Dashboard)}
        />

        <Stack.Screen
          name="FormCard"
          component={gestureHandlerRootHOC(FormCard)}
        />

        <Stack.Screen name="Card" component={gestureHandlerRootHOC(Card)} />

        <Stack.Screen
          name="SearchCard"
          component={gestureHandlerRootHOC(SearchCard)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { Routes };
