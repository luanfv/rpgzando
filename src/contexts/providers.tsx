import React from 'react';

import { UserProvider } from '@src/contexts';

const AppProviders: React.FC = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

export { AppProviders };
