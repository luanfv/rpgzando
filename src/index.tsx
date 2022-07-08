import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { theme } from '@src/settings/styles/theme';
import { AppProviders } from '@src/contexts/providers';
import { Routes } from '@src/routes';

GoogleSignin.configure({
  webClientId: process.env.AUTH_GOOGLE,
  forceCodeForRefreshToken: true,
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProviders>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />

        <Routes />
      </AppProviders>
    </ThemeProvider>
  );
};

export default App;
