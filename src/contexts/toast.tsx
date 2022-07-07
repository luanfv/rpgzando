import React, { createContext, useCallback } from 'react';
import Toast from 'react-native-toast-message';

import { IToastContext, IToastType } from '@src/types/contexts';
import { useLanguage } from '@src/hooks';

const ToastContext = createContext({} as IToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const { language } = useLanguage();

  const onToast = useCallback(
    (type: IToastType) => {
      switch (type) {
        case 'NO_CONNECTION':
          Toast.show({
            type: 'error',
            text1: language.toasts.noConnection.text1,
            text2: language.toasts.noConnection.text2,
          });

          break;

        case 'SUCCESSFUL':
          Toast.show({
            type: 'success',
            text1: language.toasts.successful.text1,
            text2: language.toasts.successful.text2,
          });

          break;

        case 'CARD_LIMIT':
          Toast.show({
            type: 'error',
            text1: language.toasts.cardLimit.text1,
            text2: language.toasts.cardLimit.text2,
          });

          break;

        default:
          break;
      }
    },
    [
      language.toasts.cardLimit.text1,
      language.toasts.cardLimit.text2,
      language.toasts.noConnection.text1,
      language.toasts.noConnection.text2,
      language.toasts.successful.text1,
      language.toasts.successful.text2,
    ],
  );

  return (
    <ToastContext.Provider value={{ onToast }}>
      {children}

      <Toast />
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
