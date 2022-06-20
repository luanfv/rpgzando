import React from 'react';
import { Button, Text, View } from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { IRoutes } from '@src/types/routes';
import { ICard } from '@src/types';
import { useTheme } from 'styled-components';

const Card: React.FC = () => {
  const { params } = useRoute<RouteProp<IRoutes, 'Card'>>();
  const { goBack } = useNavigation<NavigationProp<IRoutes, 'Card'>>();

  const theme = useTheme();

  const card = params as ICard;

  return (
    <View>
      <Text>Name: {card.name}</Text>
      <Text>Level: {card.level}</Text>
      <Text>Race: {card.race.name}</Text>
      <Text>Class: {card.class.name}</Text>
      <Text>HP: {card.hp}</Text>

      <Text>FOR: {card.attributes.for}</Text>
      <Text>DEX: {card.attributes.dex}</Text>
      <Text>CON: {card.attributes.con}</Text>
      <Text>INT: {card.attributes.int}</Text>
      <Text>WIS:{card.attributes.wis}</Text>
      <Text>CHA: {card.attributes.cha}</Text>

      <Button
        title="Back"
        onPress={() => goBack()}
        color={theme.colors.secondary}
      />
    </View>
  );
};

export { Card };
