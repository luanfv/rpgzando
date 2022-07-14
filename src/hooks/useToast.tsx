import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

import { ILanguageToast, IToastType } from '@src/types';

const useToast = (message: ILanguageToast) => {
  const onToast = useCallback(
    (type: IToastType) => {
      switch (type) {
        case 'NO_CONNECTION':
          Toast.show({
            type: 'error',
            text1: message.noConnection.text1,
            text2: message.noConnection.text2,
          });

          break;

        case 'SUCCESSFUL':
          Toast.show({
            type: 'success',
            text1: message.successful.text1,
            text2: message.successful.text2,
          });

          break;

        case 'CARD_LIMIT':
          Toast.show({
            type: 'error',
            text1: message.cardLimit.text1,
            text2: message.cardLimit.text2,
          });

          break;

        default:
          break;
      }
    },
    [message],
  );

  return { onToast };
};

export { useToast };
