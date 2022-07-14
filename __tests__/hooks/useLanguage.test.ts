import * as RN from 'react-native';
import { renderHook } from '@testing-library/react-hooks';

import { useLanguage } from '@src/hooks/useLanguage';

jest.mock('react-native', () => {
  return {
    Platform: {
      OS: jest.fn(),
    },
    NativeModules: {
      I18nManager: {
        localeIdentifier: jest.fn(),
      },
      SettingsManager: {
        settings: {
          AppleLocale: jest.fn(),
          AppleLanguages: jest.fn(),
        },
      },
    },
  };
});

describe('Hook: useLanguage (src/hooks/useLanguage)', () => {
  describe('Language = en_US', () => {
    it('Should be in Android and return type = en', () => {
      RN.Platform.OS = 'android';
      RN.NativeModules.I18nManager.localeIdentifier = 'en_US';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('en');
    });

    it('Should be in iOS (NativeModules.SettingsManager.settings.AppleLocale = false) and return type = en', () => {
      RN.Platform.OS = 'ios';
      RN.NativeModules.SettingsManager.settings.AppleLocale = false;
      RN.NativeModules.SettingsManager.settings.AppleLanguages[0] = 'en_US';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('en');
    });

    it('Should be in iOS (NativeModules.SettingsManager.settings.AppleLocale = en_US) and return type = en', () => {
      RN.Platform.OS = 'ios';
      RN.NativeModules.SettingsManager.settings.AppleLocale = 'en_US';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('en');
    });
  });

  describe('Language = pt_BR', () => {
    it('Should be in Android and return type = pt', () => {
      RN.NativeModules.I18nManager.localeIdentifier = 'pt_BR';
      RN.Platform.OS = 'android';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('pt');
    });

    it('Should be in iOS (NativeModules.SettingsManager.settings.AppleLocale = false) and return type = pt', () => {
      RN.Platform.OS = 'ios';
      RN.NativeModules.SettingsManager.settings.AppleLocale = false;
      RN.NativeModules.SettingsManager.settings.AppleLanguages[0] = 'pt_BR';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('pt');
    });

    it('Should be in iOS (NativeModules.SettingsManager.settings.AppleLocale = pt_BR) and return type = pt', () => {
      RN.Platform.OS = 'ios';
      RN.NativeModules.SettingsManager.settings.AppleLocale = 'pt_BR';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('pt');
    });
  });

  describe('Language = fr_FR', () => {
    it('Should be in Android and return type = en', () => {
      RN.NativeModules.I18nManager.localeIdentifier = 'fr_FR';
      RN.Platform.OS = 'android';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('en');
    });

    it('Should be in iOS (NativeModules.SettingsManager.settings.AppleLocale = false) and return type = en', () => {
      RN.Platform.OS = 'ios';
      RN.NativeModules.SettingsManager.settings.AppleLocale = false;
      RN.NativeModules.SettingsManager.settings.AppleLanguages[0] = 'fr_FR';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('en');
    });

    it('Should be in iOS (NativeModules.SettingsManager.settings.AppleLocale = pt_BR) and return type = en', () => {
      RN.Platform.OS = 'ios';
      RN.NativeModules.SettingsManager.settings.AppleLocale = 'fr_FR';

      const { result } = renderHook(() => useLanguage());

      const response = result.current.language;

      expect(response.type).toBe('en');
    });
  });
});
