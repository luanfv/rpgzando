import { useCallback } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { IUser } from '@src/types';

const useAuth = () => {
  const checkAuth = useCallback(async (): Promise<IUser> => {
    const currentUser = auth().currentUser;

    if (!currentUser) {
      throw Error('authorized');
    }

    return {
      displayName: String(currentUser.displayName),
      email: String(currentUser.email),
      uid: currentUser.uid,
    };
  }, []);

  const googleSignIn = useCallback(async (): Promise<IUser> => {
    await GoogleSignin.signOut();

    const googleAuth = await GoogleSignin.signIn();

    if (!googleAuth.idToken) {
      throw Error('Token not found');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(
      googleAuth.idToken,
    );

    const account = await auth().signInWithCredential(googleCredential);

    return {
      displayName: String(account.user.displayName),
      email: String(account.user.email),
      uid: account.user.uid,
    };
  }, []);

  const signOut = useCallback(async () => {
    await auth().signOut();
  }, []);

  return { checkAuth, signOut, googleSignIn };
};

export { useAuth };
