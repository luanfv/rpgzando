import React from 'react';

import Content from '../../components/Content';

import { Main, Container, Text } from './style';

const About: React.FC = () => {
  return (
    <Content title="Sobre" goBack>
      <Main>
        <Container>
          <Text>
            O RPGZando é um aplicativo de criação de fichas de RPG do D&D 5
            edição, através dele você podera criar e manter suas fichas sem a
            necessidade de papel e caneta, facilitando toda a logística que você
            precisa ter ao seu redor, sendo assim, mantendo o maior foco no que
            realmente importa, a campanha.
          </Text>
          <Text>
            O aplicativo nasceu de uma dificuldade que os jogadores iniciantes
            de RPG possuem no momento de criar suas primeiras fichas e/ou
            mante-las.
          </Text>
        </Container>
      </Main>
    </Content>
  );
};

export default About;
