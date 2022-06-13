import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ChangeCard } from '@src/pages';
import { theme } from '@src/settings/styles/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChangeCard />
    </ThemeProvider>
  );
}

export default App;
