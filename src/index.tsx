import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import ModalProvider from './hooks';
import Routes from './routes';
import styles from './styles.json';

import ModalWarnning from './components/Modal/Warnning';

const App: React.FC = () => {
  return (
    <ModalProvider>
      <StatusBar backgroundColor={styles.primary} />

      <NavigationContainer>
        <Routes />
      </NavigationContainer>

      <ModalWarnning />
    </ModalProvider>
  );
};

export default App;
