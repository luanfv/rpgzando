import React, { createContext, useCallback, useContext, useState } from 'react';

interface AppData {
  warnning: String;
  idCardSelected: String;
  addWarnning: (_message: String) => void;
  removeWarnning: () => void;
  selectIdCard: (_id: String) => void;
  deselectIdCard: () => void;
}

const AppContext = createContext({} as AppData);

export const AppProvider: React.FC = ({ children }) => {
  const [warnning, setWarnning] = useState('' as String);
  const [idCardSelected, setIdCardSelected] = useState('' as String);

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

  return (
    <AppContext.Provider
      value={{
        warnning,
        idCardSelected,
        addWarnning,
        removeWarnning,
        selectIdCard,
        deselectIdCard,
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
