import React, { useMemo } from 'react';

import { shadow } from '@src/settings/styles/shadow';
import { IMenuItem } from '@src/types/components';
import { Container, Description, Icon, Message, Title } from './styles';

const MenuItem: React.FC<IMenuItem> = ({ isMain, type, onPress }) => {
  const settings = useMemo(() => {
    switch (type) {
      case 'create':
        return {
          icon: 'person-add',
          title: 'Criar ficha',
          message: 'Crie uma nova ficha de personagem para mais uma aventura.',
        };

      case 'view':
        return {
          icon: 'ios-receipt',
          title: 'Fichas globais',
          message:
            'Visualize fichas de outras pessoas e inspire-se para fazer as suas.',
        };

      default:
        return undefined;
    }
  }, [type]);

  return (
    <Container
      isMain={isMain}
      style={shadow}
      activeOpacity={0.95}
      onPress={onPress}
    >
      {settings && (
        <>
          <Icon name={settings.icon} isMain={isMain} />

          <Description>
            <Title isMain={isMain}>{settings.title}</Title>

            <Message isMain={isMain}>{settings.message}</Message>
          </Description>
        </>
      )}
    </Container>
  );
};

export { MenuItem };
