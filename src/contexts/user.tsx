import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';

import { IUserContext, IAuthStatus } from '@src/types/contexts';
import { IUser } from '@src/types';
import { useAuth } from '@src/hooks';

const UserContext = createContext({} as IUserContext);

const UserProvider: React.FC = ({ children }) => {
  const { checkAuth, googleSignIn, signOut } = useAuth();

  const [user, setUser] = useState<IUser | null>(null);
  const [authStatus, setAuthStatus] = useState<IAuthStatus>('loading');

  const onSignOut = useCallback(() => {
    signOut().then(() => setAuthStatus('unauthorized'));
  }, [signOut]);

  const onGoogleSignIn = useCallback(() => {
    googleSignIn().then((response) => {
      setUser(response);
      setAuthStatus('authorized');
    });
  }, [googleSignIn]);

  useEffect(() => {
    checkAuth()
      .then((response) => {
        setUser(response);
        setAuthStatus('authorized');
      })
      .catch(() => {
        setAuthStatus('unauthorized');
      });
  }, [checkAuth]);

  return (
    <UserContext.Provider
      value={{ user, authStatus, onGoogleSignIn, onSignOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useContextUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useContextUser must be used within an UserProvider');
  }

  return context;
};

export { UserContext, UserProvider, useContextUser };
