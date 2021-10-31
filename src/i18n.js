import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import en from './locales/en.json';
// import de from './locales/de.json';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          'Please select a building to see it’s energy performance and asset health': 'Please select a building to see it’s energy performance and asset health',
          'Add building': 'Add building',
          'Building': 'Building',
          'Message': 'Message',
          'Setting': 'Setting',
          'Logout': 'Logout'

        }
      },
      de: {
        translation: {
          'Please select a building to see it’s energy performance and asset health': 'Bitte wählen Sie ein Gebäude aus, um dessen Energieeffizienz und Anlagenzustand zu sehen',
          'Add building': 'Gebäude hinzufügen',
          'Building': 'Building',
          'Message': 'Mitteilungen',
          'Setting': 'Einstellungen',
          'Logout': 'Ausloggen'
        }
      }
      // en: { translation: en },
      // fr: { translation: de }
    }
  });

export default i18n;
