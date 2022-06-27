import React, { useMemo } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { IRoutes } from '@src/types/routes';
import { Body, Header, Information } from '@src/components';
import { useSkill } from '@src/hooks';
import { Attributes } from './styles';
import { serviceCards } from '@src/services';

const Card: React.FC = () => {
  const { params } = useRoute<RouteProp<IRoutes, 'Card'>>();
  const { goBack, navigate } = useNavigation<NavigationProp<IRoutes, 'Card'>>();
  const { calcModifier, calcProficiency } = useSkill();

  const card = useMemo(() => {
    return params;
  }, [params]);

  const options = useMemo(() => {
    return [
      {
        label: 'Edit',
        onPress: () => {
          navigate('FormCard', card);
        },
      },
      {
        label: 'Remove',
        onPress: () => {
          serviceCards.delete(card.id).then(() => goBack());
        },
      },
    ];
  }, [card, goBack, navigate]);

  return (
    <Body>
      <Header onBack={goBack} options={options} />

      <Information title="Name" value={card.name} />

      <Information title="Level" value={String(card.level)} />

      <Information
        title="Proficiency"
        value={String(calcProficiency(card.level))}
      />

      <Information title="Race" value={card.race.name} />

      <Information title="Classe" value={card.class.name} />

      <Information title="HP" value={String(card.hp)} />

      <Attributes>
        <Information
          title="Force"
          value={`${card.attributes.for} (${calcModifier(
            card.attributes.for,
          )})`}
          width={48}
        />

        <Information
          title="Wisdom"
          value={`${card.attributes.wis} ${
            card && `(${calcModifier(card.attributes.wis)})`
          }`}
          width={48}
        />

        <Information
          title="Dexterity"
          value={`${card.attributes.dex} (${calcModifier(
            card.attributes.dex,
          )})`}
          width={48}
        />

        <Information
          title="Intelligence"
          value={`${card.attributes.int} (${calcModifier(
            card.attributes.int,
          )})`}
          width={48}
        />

        <Information
          title="Constitution"
          value={`${card.attributes.con} (${calcModifier(
            card.attributes.con,
          )})`}
          width={48}
        />

        <Information
          title="Charisma"
          value={`${card.attributes.cha} (${calcModifier(
            card.attributes.cha,
          )})`}
          width={48}
        />
      </Attributes>

      <Information title="Proficiencies" value={card.proficiencies} />

      <Information title="Items" value={card.items} />

      {!!card.notes && <Information title="Notes" value={card.notes} />}
    </Body>
  );
};

export { Card };
