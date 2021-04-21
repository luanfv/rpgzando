import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppData {
  warnning: String;
  idCardSelected: String;
  username: String;
  addWarnning: (_message: String) => void;
  removeWarnning: () => void;
  selectIdCard: (_id: String) => void;
  deselectIdCard: () => void;
  updateUsername: (_username: String) => void;
}

const AppContext = createContext({} as AppData);

export const AppProvider: React.FC = ({ children }) => {
  const [warnning, setWarnning] = useState('' as String);
  const [idCardSelected, setIdCardSelected] = useState('' as String);
  const [username, setUsername] = useState('Player' as String);

  const addWarnning = useCallback((_message: String) => {
    setWarnning(_message);
  }, []);

  const removeWarnning = useCallback(() => {
    setTimeout(() => {
      setWarnning('');
    }, 300);
  }, []);

  const selectIdCard = useCallback((_id: String): void => {
    setIdCardSelected(_id);
  }, []);

  const deselectIdCard = useCallback((): void => setIdCardSelected(''), []);

  const updateUsername = useCallback(async (_username): Promise<void> => {
    setUsername(_username);
    await AsyncStorage.setItem('@RPGZando:username', JSON.stringify(_username));
  }, []);

  useEffect(() => {
    async function getStorage() {
      const storageUsername = await AsyncStorage.getItem('@RPGZando:username');

      if (storageUsername) {
        setUsername(JSON.parse(storageUsername) as String);
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
