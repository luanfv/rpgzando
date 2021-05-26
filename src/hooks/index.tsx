import React from 'react';

import { AppProvider } from './AppContext';
import { CardsProvider } from './CardsContext';

const AppProviders: React.FC = ({ children }) => (
  <AppProvider>
    <CardsProvider>{children}</CardsProvider>
  </AppProvider>
);

export default AppProviders;
