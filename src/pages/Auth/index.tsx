import React from 'react';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { useLanguage } from '@src/hooks';
import { useContextUser } from '@src/contexts';
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
  const { onGoogleSignIn } = useContextUser();
  const { language } = useLanguage();

  return (
    <Body>
      <Container>
        <Header>
          <Logo source={require('@src/assets/images/logo.png')} />
          <Title>{language.pages.Auth.title}</Title>

          <Description>{language.pages.Auth.description}</Description>
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
