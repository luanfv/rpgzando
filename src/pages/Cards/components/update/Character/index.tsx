import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Form } from '@unform/mobile';
import Icon from 'react-native-vector-icons/Feather';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ICard } from '../../../../../hooks/CardsContext';

import Input from '../../../../../components/Input';
import InputNumeric from '../../../../../components/InputNumeric';
import Button from '../../../../../components/Button';

import { Body, Container, Title, TitleText, TitleIcon } from '../style';

interface IProps {
  open: Boolean;
  card: ICard;
  close: () => void;
}

const UpdateCharacter: React.FC<IProps> = ({ open, card, close }) => {
  const formRef = useRef(null);
  const [hpUpdated, setHpUpdated] = useState(card.hp);

  return (
    <Modal isVisible={!!open} animationInTiming={1} animationOutTiming={1}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Body>
          <Form ref={formRef} onSubmit={() => console.log('submit')}>
            <Title>
              <TitleText>Personagem</TitleText>
              <TitleIcon onPress={close}>
                <Icon name="x" color="#fff" size={28} onPress={close} />
              </TitleIcon>
            </Title>
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
                value={Number(hpUpdated)}
                min={1}
                max={999}
                onChange={(value) => setHpUpdated(value)}
              />
            </Container>
          </Form>

          <Container>
            <Button title="Salvar" onPress={() => console.log('save')} />
          </Container>
        </Body>
      </ScrollView>
    </Modal>
  );
};

export default UpdateCharacter;
