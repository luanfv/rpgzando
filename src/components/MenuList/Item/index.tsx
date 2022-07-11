import React from 'react';

import { shadow } from '@src/settings/styles/shadow';
import { IMenuItem } from '@src/types/components';
import { Container, Description, Icon, Message, Title } from './styles';

const MenuItem: React.FC<IMenuItem> = ({ isMain, settings, onPress }) => {
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
