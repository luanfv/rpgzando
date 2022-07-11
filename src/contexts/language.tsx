import React, { createContext, useMemo } from 'react';
import { NativeModules, Platform } from 'react-native';

import { en_US, pt_BR } from '@src/settings/i18n';
import { ILanguageContext } from '@src/types/contexts';

const LanguageContext = createContext({} as ILanguageContext);

const LanguageProvider: React.FC = ({ children }) => {
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

  return (
    <LanguageContext.Provider value={{ language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
