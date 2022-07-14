import React from 'react';

import { AuthProvider, LanguageProvider } from '@src/contexts';

const AppProviders: React.FC = ({ children }) => (
  <LanguageProvider>
    <AuthProvider>{children}</AuthProvider>
  </LanguageProvider>
);

export { AppProviders };
