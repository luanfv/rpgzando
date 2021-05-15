import React, { useMemo, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { useCards } from '../../../hooks/CardsContext';
import { useApp } from '../../../hooks/AppContext';

import {
  calcModifier,
  expertises,
  calcProficiency,
} from '../../../utils/rules';

import Content from '../../../components/Content';
import ProgressBar from '../../../components/ProgressBar';

import UpdateCharacter from '../components/Update/Character';
import UpdateAttributes from '../components/Update/Attributes';
import UpdateAnnotations from '../components/Update/Annotations';

import {
  Main,
  Container,
  Information,
  Title,
  TitleText,
  TitleIcon,
  Description,
  Text,
  AttributesContet,
  Attributes,
  Expertise,
} from './style';

interface IRouteParams {
  newCard?: Boolean;
}

const Show: React.FC = () => {
  const [updateCharacterIsOpen, setUpdateCharacterIsOpen] = useState(false);
  const [updateAttributesIsOpen, setUpdateAttributesIsOpen] = useState(false);
  const [updateAnnotationsIsOpen, setUpdateAnnotationsIsOpen] = useState(false);

  const { params } = useRoute();

  const { findCard } = useCards();
  const { idCardSelected } = useApp();

  const routeParams = params as IRouteParams | undefined;

  const card = useMemo(() => findCard(idCardSelected), [
    findCard,
    idCardSelected,
  ]);

  return (
    <Content title="Ficha" goBack idCard={idCardSelected}>
      <Main>
        {!!routeParams && !!routeParams.newCard && <ProgressBar phase={3} />}

        <Container>
          <Title>
            <TitleText>Personagem</TitleText>
            <TitleIcon onPress={() => setUpdateCharacterIsOpen(true)}>
              <Icon name="edit" size={22} color="#fff" />
            </TitleIcon>
          </Title>

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
          <Title>
            <TitleText>Atributos</TitleText>
            <TitleIcon onPress={() => setUpdateAttributesIsOpen(true)}>
              <Icon name="edit" size={22} color="#fff" />
            </TitleIcon>
          </Title>

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
          <Title>
            <TitleText>Perícias</TitleText>
          </Title>

          {!!card &&
            expertises.map((_expertise, _index) => {
              const proficiency = Number(calcProficiency(card.level));
              const foundId = card.expertise.find(
                (_id) => _id === _expertise.id,
              );
              const formatModifier = (
                _modifier: Number,
                _proficiency: Number,
              ) => {
                const response = Number(_modifier) + Number(_proficiency);

                return response > 0 ? `+${response}` : response;
              };

              const handleValue = () => {
                if (_expertise.type === 1) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.for));
                    return formatModifier(modifier, proficiency);
                  }

                  return calcModifier(card.attributes.for);
                } else if (_expertise.type === 2) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.dex));
                    return formatModifier(modifier, proficiency);
                  }

                  return calcModifier(card.attributes.dex);
                } else if (_expertise.type === 3) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.con));
                    return formatModifier(modifier, proficiency);
                  }

                  return calcModifier(card.attributes.con);
                } else if (_expertise.type === 4) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.int));
                    return formatModifier(modifier, proficiency);
                  }

                  return calcModifier(card.attributes.int);
                } else if (_expertise.type === 5) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.wis));
                    return formatModifier(modifier, proficiency);
                  }

                  return calcModifier(card.attributes.wis);
                } else if (_expertise.type === 6) {
                  if (foundId) {
                    const modifier = Number(calcModifier(card.attributes.cha));
                    return formatModifier(modifier, proficiency);
                  }

                  return calcModifier(card.attributes.cha);
                } else {
                  return '0';
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

        <Container>
          <Title>
            <TitleText>Anotações</TitleText>
            <TitleIcon onPress={() => setUpdateAnnotationsIsOpen(true)}>
              <Icon name="edit" size={22} color="#fff" />
            </TitleIcon>
          </Title>
          <Information>
            {!!card?.annotations && card?.annotations.trim() ? (
              <Text>{card?.annotations}</Text>
            ) : (
              <Description>Nenhuma anotação...</Description>
            )}
          </Information>
        </Container>
      </Main>

      {!!card && (
        <UpdateCharacter
          card={card}
          open={updateCharacterIsOpen}
          close={() => setUpdateCharacterIsOpen(false)}
        />
      )}

      {!!card && (
        <UpdateAttributes
          card={card}
          open={updateAttributesIsOpen}
          close={() => setUpdateAttributesIsOpen(false)}
        />
      )}

      {!!card && (
        <UpdateAnnotations
          card={card}
          open={updateAnnotationsIsOpen}
          close={() => setUpdateAnnotationsIsOpen(false)}
        />
      )}
    </Content>
  );
};

export default Show;
