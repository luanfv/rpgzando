import React from 'react';

import { AuthProvider, LanguageProvider, ToastProvider } from '@src/contexts';

const AppProviders: React.FC = ({ children }) => (
  <LanguageProvider>
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  </LanguageProvider>
);

export { AppProviders };
