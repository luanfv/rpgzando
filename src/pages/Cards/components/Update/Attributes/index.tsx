import React, { useRef, useState, useMemo, useCallback } from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ICard,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IUpdateAttributesData,
  useCards,
} from '../../../../../hooks/CardsContext';
import { useApp } from '../../../../../hooks/AppContext';

import InputNumeric from '../../../../../components/InputNumeric';
import Button from '../../../../../components/Button';

import { Body, Main, Container, Title, TitleText, TitleIcon } from '../style';

interface IUpdateAttributesProps {
  open: boolean;
  card: ICard;
  close: () => void;
}

const UpdateAttributes: React.FC<IUpdateAttributesProps> = ({
  open,
  card,
  close,
}) => {
  const { addWarnning } = useApp();
  const { updateAttributes } = useCards();

  const formRef = useRef<FormHandles>(null);

  const id = useMemo(() => card.id, [card]);

  const [force, setForce] = useState(card.attributes.for);
  const [dexterity, setDexterity] = useState(card.attributes.dex);
  const [constitution, setConstitution] = useState(card.attributes.con);
  const [wisdom, setWisdom] = useState(card.attributes.wis);
  const [intelligence, setIntelligence] = useState(card.attributes.int);
  const [charisma, setCharisma] = useState(card.attributes.cha);

  const handleSubmit = useCallback(
    async (data: IUpdateAttributesData) => {
      try {
        if (!data.id) {
          throw Error('Seu personagem não foi encontrado.');
        }

        const response = updateAttributes(data);

        if (response) {
          close();
        }
      } catch (err: any) {
        if (err) {
          addWarnning(err.message);
        }
      }
    },
    [addWarnning, close, updateAttributes],
  );

  return (
    <Modal
      isVisible={!!open}
      animationInTiming={1}
      animationOutTiming={1}
      onBackButtonPress={close}
    >
      <Body>
        <Main>
          <Title>
            <TitleText>Atributos</TitleText>
            <TitleIcon onPress={close}>
              <Icon name="x" color="#fff" size={28} onPress={close} />
            </TitleIcon>
          </Title>
          <ScrollView
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Form
              ref={formRef}
              onSubmit={() =>
                handleSubmit({
                  id: id,
                  for: force,
                  dex: dexterity,
                  con: constitution,
                  wis: wisdom,
                  int: intelligence,
                  cha: charisma,
                })
              }
            >
              <Container>
                <InputNumeric
                  title="Força:"
                  value={force}
                  min={1}
                  max={99}
                  onChange={(value) => setForce(value)}
                />

                <InputNumeric
                  title="Destreza:"
                  value={dexterity}
                  min={1}
                  max={99}
                  onChange={(value) => setDexterity(value)}
                />

                <InputNumeric
                  title="Constituição:"
                  value={constitution}
                  min={1}
                  max={99}
                  onChange={(value) => setConstitution(value)}
                />

                <InputNumeric
                  title="Sabedoria:"
                  value={wisdom}
                  min={1}
                  max={99}
                  onChange={(value) => setWisdom(value)}
                />

                <InputNumeric
                  title="Inteligência:"
                  value={intelligence}
                  min={1}
                  max={99}
                  onChange={(value) => setIntelligence(value)}
                />

                <InputNumeric
                  title="Carisma:"
                  value={charisma}
                  min={1}
                  max={99}
                  onChange={(value) => setCharisma(value)}
                />
              </Container>

              <Container>
                <Button
                  title="Salvar"
                  onPress={() => formRef.current?.submitForm()}
                />
              </Container>
            </Form>
          </ScrollView>
        </Main>
      </Body>
    </Modal>
  );
};

export default UpdateAttributes;
