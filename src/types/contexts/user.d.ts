import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type IAuthStatus = 'loading' | 'authorized' | 'unauthorized';

interface IAuthContext {
  user: FirebaseAuthTypes.User | null;
  status: IAuthStatus;
  onGoogleSignIn: () => Promise<void>;
  onSignOut: () => void;
}

export { IAuthContext, IAuthStatus };
