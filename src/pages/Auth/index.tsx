import React from 'react';
import { Button, View } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { useAuth } from '@src/hooks';

const Auth: React.FC = () => {
  const { onGoogleSignIn } = useAuth();

  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        onPress={onGoogleSignIn}
      />
      <Button title="Apple" onPress={() => {}} />
    </View>
  );
};

export { Auth };
