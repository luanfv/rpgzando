import React, { createContext, useCallback, useContext, useState } from 'react';

interface AppData {
  warnning: String;
  addWarnning: (message: String) => void;
  removeWarnning: () => void;
}

const ModalContext = createContext({} as AppData);

export const ModalProvider: React.FC = ({ children }) => {
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
    <ModalContext.Provider
      value={{
        warnning,
        addWarnning,
        removeWarnning,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider');
  }

  return context;
}
