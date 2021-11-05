import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import PortfolioEN from "locales/en/Portfolio.json"
import PortfolioDE from "locales/de/Portfolio.json"
import CommonEN from 'locales/en/Common.json'
import CommonDE from 'locales/de/Common.json'
import GeneralBuildingInformationEN from 'locales/en/GeneralBuildingInformation.json'
import GeneralBuildingInformationDE from 'locales/de/GeneralBuildingInformation.json'


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
        common: CommonEN,
        generalBuildingInformation: GeneralBuildingInformationEN,
        portfolio: PortfolioEN,
      },
      de: {
        common: CommonDE,
        portfolio: PortfolioDE,
        generalBuildingInformation: GeneralBuildingInformationDE,
      },
    },
  })

export default i18n
