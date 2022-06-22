import 'react-native-gesture-handler';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { theme } from '@src/settings/styles/theme';
import { AppProviders } from '@src/context/providers';
import { Routes } from '@src/routes';

GoogleSignin.configure({
  webClientId: process.env.AUTH_GOOGLE,
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProviders>
        <Routes />
      </AppProviders>
    </ThemeProvider>
  );
};

export default App;
