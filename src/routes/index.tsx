import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { ChangeCard, Card, Auth } from '@src/pages';
import { useAuth } from '@src/hooks';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const { status } = useAuth();

  if (status === 'loading') {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (status === 'unauthorized') {
    return <Auth />;
  }

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
