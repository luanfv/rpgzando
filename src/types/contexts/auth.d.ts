import { IUser } from '@src/types';

type IAuthStatus = 'loading' | 'authorized' | 'unauthorized';

interface IAuthContext {
  user: IUser | null;
  status: IAuthStatus;
  onGoogleSignIn: () => Promise<void>;
  onSignOut: () => void;
}

export { IAuthContext, IAuthStatus };