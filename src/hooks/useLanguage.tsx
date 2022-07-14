import { useMemo } from 'react';
import { NativeModules, Platform } from 'react-native';

import { en_US, pt_BR } from '@src/settings/i18n';

const useLanguage = () => {
  const language = useMemo(() => {
    const deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    if (deviceLanguage === 'pt_BR') {
      return pt_BR;
    }

    return en_US;
  }, []);

  return { language };
};

export { useLanguage };
