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
import Button from '../../../../../components/Button';

import { Body, Main, Container, Title, TitleText, TitleIcon } from '../style';

interface IUpdateCharacterProps {
  open: boolean;
  card: ICard;
  close: () => void;
}

interface IHandleSubmit {
  id: string;
  annotations: string;
}

const UpdateCharacter: React.FC<IUpdateCharacterProps> = ({
  open,
  card,
  close,
}) => {
  const { addWarnning } = useApp();
  const { updateAnnotations } = useCards();

  const formRef = useRef<FormHandles>(null);
  const [annotations, setAnnotations] = useState(card.annotations);
  const id = useMemo(() => card.id, [card]);

  const handleSubmit = useCallback(
    async (data: IHandleSubmit) => {
      try {
        if (!data.id) {
          throw Error('Seu personagem não foi encontrado.');
        }

        const response = updateAnnotations(data);

        if (response) {
          close();
        }
      } catch (err: any) {
        if (err) {
          addWarnning(err.message);
        }
      }
    },
    [addWarnning, close, updateAnnotations],
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
            <TitleText>Anotações</TitleText>
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
              onSubmit={() => handleSubmit({ id, annotations })}
            >
              <Container>
                <Input
                  autoCorrect={false}
                  name="annotations"
                  icon="file-text"
                  placeholder="Adicione anotações..."
                  value={annotations}
                  onChangeText={(value) => setAnnotations(value)}
                  multiline={true}
                  numberOfLines={4}
                  textarea={true}
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
