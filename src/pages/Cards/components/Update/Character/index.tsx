import React, { useRef, useState, useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Form } from '@unform/mobile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ICard, useCards } from '../../../../../hooks/CardsContext';
import { useApp } from '../../../../../hooks/AppContext';

import Input from '../../../../../components/Input';
import InputNumeric from '../../../../../components/InputNumeric';
import Button from '../../../../../components/Button';

import { Body, Main, Container, Title, TitleText, TitleIcon } from '../style';

interface IProps {
  open: Boolean;
  card: ICard;
  close: () => void;
}

interface IHandleSubmit {
  id: String;
  name: String;
  level: String;
  hp: Number;
}

const UpdateCharacter: React.FC<IProps> = ({ open, card, close }) => {
  const { addWarnning } = useApp();
  const { updateCharacter } = useCards();

  const formRef = useRef<FormHandles>(null);
  const [name, setName] = useState(card.name);
  const [level, setLevel] = useState(String(card.level));
  const [hp, setHp] = useState(card.hp);
  const id = useMemo(() => card.id, [card]);

  const handleSubmit = useCallback(
    async (_data: IHandleSubmit) => {
      try {
        if (!_data.id) {
          throw Error('Seu personagem não foi encontrado.');
        }

        if (_data.name.length < 1) {
          throw Error('Seu personagem precisa de um nome.');
        }

        if (
          !_data.level ||
          _data.level.indexOf('.') !== -1 ||
          _data.level.indexOf(',') !== -1 ||
          !Number(_data.level) ||
          Number(_data.level) < 1
        ) {
          throw Error('Seu nível precisa ser um número inteiro e maior que 0.');
        }

        const response = updateCharacter({
          id: _data.id,
          name: _data.name,
          level: _data.level,
          hp: _data.hp,
        });

        if (!response) {
          throw Error('Não foi possível atualizar seu personagem.');
        }

        close();
      } catch (err) {
        const { message } = err;

        addWarnning(message);
      }
    },
    [addWarnning, close, updateCharacter],
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
            <Form
              ref={formRef}
              onSubmit={() => handleSubmit({ id, name, level, hp })}
            >
              <Container>
                <Input
                  autoCorrect={false}
                  name="name"
                  icon="user"
                  placeholder="Nome"
                  value={String(name)}
                  onChangeText={(value) => setName(value)}
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
                  value={String(level)}
                  onChangeText={(value) => setLevel(value)}
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
