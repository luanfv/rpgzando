import React from 'react';

import { ModalProvider } from './ModalContext';
import { CardsProvider } from './CardsContext';

const ModalProviders: React.FC = ({ children }) => (
  <ModalProvider>
    <CardsProvider>{children}</CardsProvider>
  </ModalProvider>
);

export default ModalProviders;
