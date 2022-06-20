import 'react-native-gesture-handler';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@src/settings/styles/theme';
import { Routes } from '@src/routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
