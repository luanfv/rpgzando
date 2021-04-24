import React, { useRef } from 'react';

import Modal from 'react-native-modal';
import { Form } from '@unform/mobile';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ICard } from '../../../../../hooks/CardsContext';

import Input from '../../../../../components/Input';
import InputNumeric from '../../../../../components/InputNumeric';
import Button from '../../../../../components/Button';

import { Body, Container } from '../style';

interface IProps {
  open: Boolean;
  card: ICard;
}

const UpdateCharacter: React.FC<IProps> = ({ open, card }) => {
  const formRef = useRef(null);

  return (
    <Modal isVisible={!!open} animationInTiming={1} animationOutTiming={1}>
      <Body>
        <Form ref={formRef} onSubmit={() => console.log('submit')}>
          <Container>
            <Input
              autoCorrect={false}
              name="name"
              icon="user"
              placeholder="Nome"
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
            />
          </Container>

          <Container>
            <InputNumeric
              title="HP:"
              value={Number(card?.hp)}
              min={1}
              max={999}
              onChange={() => console.log('oie')}
            />
          </Container>

          <Container>
            <Button title="Salvar" onPress={() => console.log('save')} />
          </Container>
        </Form>
      </Body>
    </Modal>
  );
};

export default UpdateCharacter;
