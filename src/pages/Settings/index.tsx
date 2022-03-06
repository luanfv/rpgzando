/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useApp } from '../../hooks/AppContext';

import Content from '../../components/Content';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './style';
import getValidationErrors from '../../utils/getValidationErrors';

interface IHandleSubmit {
  username: string;
}

const Settings: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { username, updateUsername, addWarnning } = useApp();

  const handleSubmit = useCallback(
    async (data: IHandleSubmit) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Você precisar ter um username.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        updateUsername(data.username);
        addWarnning('Seu username foi alterado com sucesso!');
      } catch (err: any) {
        const errors: { username?: string } = getValidationErrors(err);

        if (errors.username) {
          addWarnning(errors.username);
          formRef.current?.setErrors(errors);
        } else {
          addWarnning('Ocorreu um erro inesperado, tente novamente.');
        }
      }
    },
    [addWarnning, updateUsername],
  );

  return (
    <Content title="Configurações" goBack>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="username"
            icon="smile"
            placeholder="Informe seu username"
            defaultValue={`${username}`}
          />
          <Button
            title="Salvar"
            onPress={() => formRef.current?.submitForm()}
          />
        </Form>
      </Container>
    </Content>
  );
};

export default Settings;
