import React from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { useAuth } from '@src/hooks';
import { Body } from '@src/components';
import {
  Container,
  Description,
  GoogleAuth,
  Header,
  Logo,
  Title,
} from './styles';

const Auth: React.FC = () => {
  const { onGoogleSignIn } = useAuth();

  return (
    <Body>
      <Container>
        <Header>
          <Logo source={require('@src/assets/images/logo.png')} />
          <Title>Welcome</Title>

          <Description>Have your rpg chips in one place</Description>
        </Header>

        <GoogleAuth
          size={GoogleSigninButton.Size.Wide}
          onPress={onGoogleSignIn}
        />
      </Container>
    </Body>
  );
};

export { Auth };
