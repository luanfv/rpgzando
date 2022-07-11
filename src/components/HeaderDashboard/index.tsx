import React from 'react';
import { TouchableOpacity } from 'react-native';

import { IHeaderDashboard } from '@src/types/components';
import { MenuList } from '@src/components/MenuList';
import { Container, Header, Icon, Welcome, WelcomeText } from './styles';

const HeaderDashboard: React.FC<IHeaderDashboard> = ({
  text1,
  text2,
  menuItems,
  onSignOut,
}) => {
  return (
    <Container>
      <Header>
        <Welcome>
          <WelcomeText>{text1}</WelcomeText>
          <WelcomeText bold>{text2}</WelcomeText>
        </Welcome>

        <TouchableOpacity activeOpacity={0.8} onPress={onSignOut}>
          <Icon name="log-out-outline" />
        </TouchableOpacity>
      </Header>

      <MenuList items={menuItems} />
    </Container>
  );
};

export { HeaderDashboard };
