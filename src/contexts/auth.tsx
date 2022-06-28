import React, { createContext, useState, useEffect, useCallback } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { IAuthContext, IAuthStatus } from '@src/types/contexts';

const AuthContext = createContext({} as IAuthContext);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [status, setStatus] = useState<IAuthStatus>('loading');

  const onSignOut = useCallback(() => {
    auth()
      .signOut()
      .then(() => setStatus('unauthorized'));
  }, []);

  const onGoogleSignIn = useCallback(async () => {
    await GoogleSignin.signOut();

    const googleAuth = await GoogleSignin.signIn();

    if (googleAuth.idToken) {
      const googleCredential = auth.GoogleAuthProvider.credential(
        googleAuth.idToken,
      );

      try {
        const account = await auth().signInWithCredential(googleCredential);

        setUser(account.user);
        setStatus('authorized');
      } catch {
        onSignOut();
      }
    }
  }, [onSignOut]);

  useEffect(() => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      setUser(currentUser);
      setStatus('authorized');
    } else {
      setStatus('unauthorized');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, onGoogleSignIn, onSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
