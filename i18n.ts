import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageDetectorAsyncModule } from 'i18next';
import { EnglishJson } from './locales/en/translation';
import { FrenchJson } from './locales/fr/translation';

const LanguageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (language: string) => void) => {
    AsyncStorage.getItem('language')
      .then((language) => {
        if (language) {
          callback(language);
        } else {
          callback('en'); // Default language
        }
      })
      .catch(() => {
        callback('en'); // Fallback language
      });
  },
  init: () => {
    // Optional initialization code
  },
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem('language', language).catch(() => {
      // Handle errors here if needed
    });
  },
};

i18n
  .use(HttpApi) // To load translations via HTTP
  .use(LanguageDetector) // To detect the user's language
  .use(initReactI18next) // Integrates i18next with React
  .init({
    fallbackLng: 'en', // Default language
    supportedLngs: ['en', 'es', 'fr'], // Add your supported languages here
    compatibilityJSON: 'v3', // Ensures compatibility
    resources: {
        en: { translation: EnglishJson },
        fr: { translation: FrenchJson },
      },
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;
