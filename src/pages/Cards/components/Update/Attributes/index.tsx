import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ICard } from '../../../../../hooks/CardsContext';

import InputNumeric from '../../../../../components/InputNumeric';
import Button from '../../../../../components/Button';

import { Body, Main, Container, Title, TitleText, TitleIcon } from '../style';

interface IProps {
  open: Boolean;
  card: ICard;
  close: () => void;
}

const UpdateCharacter: React.FC<IProps> = ({ open, card, close }) => {
  const formRef = useRef<FormHandles>(null);
  const [force, setForce] = useState(card.attributes.for);
  const [dexterity, setDexterity] = useState(card.attributes.dex);
  const [constitution, setConstitution] = useState(card.attributes.con);
  const [wisdom, setWisdom] = useState(card.attributes.wis);
  const [intelligence, setIntelligence] = useState(card.attributes.int);
  const [charisma, setCharisma] = useState(card.attributes.cha);

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
            <Form ref={formRef} onSubmit={() => console.log('submit')}>
              <Container>
                <InputNumeric
                  title="Força:"
                  value={Number(force)}
                  min={1}
                  max={99}
                  onChange={(value) => setForce(value)}
                />

                <InputNumeric
                  title="Destreza:"
                  value={Number(dexterity)}
                  min={1}
                  max={99}
                  onChange={(value) => setDexterity(value)}
                />

                <InputNumeric
                  title="Constituição:"
                  value={Number(constitution)}
                  min={1}
                  max={99}
                  onChange={(value) => setConstitution(value)}
                />

                <InputNumeric
                  title="Sabedoria:"
                  value={Number(wisdom)}
                  min={1}
                  max={99}
                  onChange={(value) => setWisdom(value)}
                />

                <InputNumeric
                  title="Inteligência:"
                  value={Number(intelligence)}
                  min={1}
                  max={99}
                  onChange={(value) => setIntelligence(value)}
                />

                <InputNumeric
                  title="Carisma:"
                  value={Number(charisma)}
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

export default UpdateCharacter;
