import React from 'react';

import { AuthProvider } from '@src/contexts/user';

const AppProviders: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export { AppProviders };
