import React, { createContext, useCallback, useContext, useState } from 'react';

interface AppData {
  warnning: String;
  addWarnning: (message: String) => void;
  removeWarnning: () => void;
}

const AppContext = createContext({} as AppData);

export const AppProvider: React.FC = ({ children }) => {
  const [warnning, setWarnning] = useState('' as String);

  const addWarnning = useCallback((message: String) => {
    setWarnning(message);
  }, []);

  const removeWarnning = useCallback(() => {
    setTimeout(() => {
      setWarnning('');
    }, 300);
  }, []);

  return (
    <AppContext.Provider
      value={{
        warnning,
        addWarnning,
        removeWarnning,
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
