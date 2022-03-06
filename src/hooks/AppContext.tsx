import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAppData {
  warnning: string;
  idCardSelected: string;
  username: string;
  addWarnning: (message: string) => void;
  removeWarnning: () => void;
  selectIdCard: (id: string) => void;
  deselectIdCard: () => void;
  updateUsername: (username: string) => void;
}

const AppContext = createContext({} as IAppData);

export const AppProvider: React.FC = ({ children }) => {
  const [warnning, setWarnning] = useState('');
  const [idCardSelected, setIdCardSelected] = useState('');
  const [username, setUsername] = useState('Player');

  const addWarnning = useCallback((message: string) => {
    setWarnning(message);
  }, []);

  const removeWarnning = useCallback(() => {
    setTimeout(() => {
      setWarnning('');
    }, 300);
  }, []);

  const selectIdCard = useCallback((id: string): void => {
    setIdCardSelected(id);
  }, []);

  const deselectIdCard = useCallback((): void => setIdCardSelected(''), []);

  const updateUsername = useCallback(async (newUserName) => {
    setUsername(newUserName);
    await AsyncStorage.setItem(
      '@RPGZando:username',
      JSON.stringify(newUserName),
    );
  }, []);

  useEffect(() => {
    async function getStorage() {
      const storageUsername = await AsyncStorage.getItem('@RPGZando:username');

      if (storageUsername) {
        setUsername(JSON.parse(storageUsername));
      }
    }

    getStorage();
  }, []);

  return (
    <AppContext.Provider
      value={{
        warnning,
        idCardSelected,
        username,
        addWarnning,
        removeWarnning,
        selectIdCard,
        deselectIdCard,
        updateUsername,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}
