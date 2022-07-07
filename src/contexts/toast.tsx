import React, { createContext, useCallback } from 'react';
import Toast from 'react-native-toast-message';

import { IToastContext, IToastType } from '@src/types/contexts';

const ToastContext = createContext({} as IToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const onToast = useCallback((type: IToastType) => {
    switch (type) {
      case 'NO_CONNECTION':
        Toast.show({
          type: 'error',
          text1: 'NO CONNECTION 🙈 🙉 🙊',
          text2:
            'You or service is offline, check your connection and try again!',
        });

        break;

      case 'SUCCESSFUL':
        Toast.show({
          type: 'success',
          text1: 'SUCCESSFUL 🔝',
          text2: 'Your action was executed successfully!',
        });

        break;

      default:
        break;
    }
  }, []);

  return (
    <ToastContext.Provider value={{ onToast }}>
      {children}

      <Toast />
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
