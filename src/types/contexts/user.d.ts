import { IUser } from '@src/types';

type IAuthStatus = 'loading' | 'authorized' | 'unauthorized';

interface IUserContext {
  user: IUser | null;
  authStatus: IAuthStatus;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
}

export { IUserContext, IAuthStatus };
