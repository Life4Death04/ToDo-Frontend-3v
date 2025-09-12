import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import es from './es.json';

i18next
  .use(LanguageDetector) // detects user language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    resources: {
      en: { //For the English language...
        translation: en //...use the translations found in `en.json`
      },
      es: { //For the Spanish language...
        translation: es //...use the translations found in `es.json`
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18next;