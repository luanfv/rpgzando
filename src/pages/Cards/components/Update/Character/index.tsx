import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ICard } from '../../../../../hooks/CardsContext';

import Input from '../../../../../components/Input';
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
  const [hp, setHp] = useState(card.hp);

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
            <TitleText>Personagem</TitleText>
            <TitleIcon onPress={close}>
              <Icon name="x" color="#fff" size={28} onPress={close} />
            </TitleIcon>
          </Title>

          <ScrollView
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
          >
            <Form ref={formRef} onSubmit={() => console.log('submit')}>
              <Container>
                <Input
                  autoCorrect={false}
                  name="name"
                  icon="user"
                  placeholder="Nome"
                  defaultValue={String(card.name)}
                />
              </Container>

              <Container>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  name="level"
                  icon="award"
                  placeholder="Nível"
                  defaultValue={String(card.level)}
                />
              </Container>

              <Container>
                <InputNumeric
                  title="HP:"
                  value={Number(hp)}
                  min={1}
                  max={999}
                  onChange={(value) => setHp(value)}
                />
              </Container>
            </Form>

            <Container>
              <Button
                title="Salvar"
                onPress={() => formRef.current?.submitForm()}
              />
            </Container>
          </ScrollView>
        </Main>
      </Body>
    </Modal>
  );
};

export default UpdateCharacter;
