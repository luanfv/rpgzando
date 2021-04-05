import React, { useMemo } from 'react';
import { useRoute } from '@react-navigation/native';

import { useCards } from '../../../hooks/CardsContext';

import {
  calcModifier,
  expertises,
  calcProficiency,
} from '../../../utils/rules';

import Content from '../../../components/Content';
import ProgressBar from '../../../components/ProgressBar';

import {
  Main,
  Container,
  Information,
  Title,
  Description,
  Text,
  AttributesContet,
  Attributes,
  Expertise,
} from './style';

interface IRouteParams {
  id: String;
  newCard?: Boolean;
}

const Show: React.FC = () => {
  const { findCard } = useCards();
  const { params } = useRoute();

  const routeParams = params as IRouteParams;

  const card = useMemo(() => findCard(routeParams.id), [findCard, routeParams]);

  return (
    <Content title="Ficha" goBack>
      <Main>
        {!!routeParams.newCard && <ProgressBar phase={3} />}

        <Container>
          <Title>Personagem</Title>

          <Information>
            <Description>Nome</Description>
            <Text>{card?.name}</Text>
          </Information>

          <Information>
            <Description>Nível</Description>
            <Text>{card?.level}</Text>
          </Information>

          <Information>
            <Description>Raça</Description>
            <Text>{card?.race.name}</Text>
          </Information>

          <Information>
            <Description>Classe</Description>
            <Text>{card?.profession.name}</Text>
          </Information>

          <Information>
            <Description>HP</Description>
            <Text>{card?.hp}</Text>
          </Information>
        </Container>

        <Container>
          <Title>Atributos</Title>

          <Attributes>
            <AttributesContet>
              <Description>Força</Description>
              <Text>
                {card?.attributes.for}{' '}
                {card && `(${calcModifier(card?.attributes.for)})`}
              </Text>
            </AttributesContet>

            <AttributesContet>
              <Description>Sabedoria</Description>
              <Text>
                {card?.attributes.wis}{' '}
                {card && `(${calcModifier(card?.attributes.wis)})`}
              </Text>
            </AttributesContet>

            <AttributesContet>
              <Description>Destreza</Description>
              <Text>
                {card?.attributes.dex}{' '}
                {card && `(${calcModifier(card?.attributes.dex)})`}
              </Text>
            </AttributesContet>

            <AttributesContet>
              <Description>Inteligência</Description>
              <Text>
                {card?.attributes.int}{' '}
                {card && `(${calcModifier(card?.attributes.int)})`}
              </Text>
            </AttributesContet>

            <AttributesContet>
              <Description>Constituição</Description>
              <Text>
                {card?.attributes.con}{' '}
                {card && `(${calcModifier(card?.attributes.con)})`}
              </Text>
            </AttributesContet>

            <AttributesContet>
              <Description>Carisma</Description>
              <Text>
                {card?.attributes.cha}{' '}
                {card && `(${calcModifier(card?.attributes.cha)})`}
              </Text>
            </AttributesContet>
          </Attributes>
        </Container>

        <Container>
          <Title>Perícias</Title>

          {!!card &&
            expertises.map((_expertise, _index) => {
              const proficiency = Number(calcProficiency(card.level));
              const foundId = card.expertise.find(
                (_id) => _id === _expertise.id,
              );

              const handleValue = () => {
                if (_expertise.type === 1) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.for));

                    return `+${modifier + proficiency}`;
                  }

                  return calcModifier(card.attributes.for);
                } else if (_expertise.type === 2) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.dex));

                    return `+${modifier + proficiency}`;
                  }

                  return calcModifier(card.attributes.dex);
                } else if (_expertise.type === 3) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.con));

                    return `+${modifier + proficiency}`;
                  }

                  return calcModifier(card.attributes.con);
                } else if (_expertise.type === 4) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.int));

                    return `+${modifier + proficiency}`;
                  }

                  return calcModifier(card.attributes.int);
                } else if (_expertise.type === 5) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.wis));

                    return `+${modifier + proficiency}`;
                  }

                  return calcModifier(card.attributes.wis);
                } else if (_expertise.type === 6) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.cha));

                    return `+${modifier + proficiency}`;
                  }

                  return calcModifier(card.attributes.cha);
                } else {
                  return '+0';
                }
              };

              return (
                <Expertise selected={!!foundId} key={_index}>
                  <Text>{_expertise.desc}</Text>
                  <Text>{handleValue()}</Text>
                </Expertise>
              );
            })}
        </Container>
      </Main>
    </Content>
  );
};

export default Show;
