import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { CONFIG } from '../config'
import { languages } from './data'

const isDev = CONFIG.NODE_ENV === 'development'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: languages[0],
    debug: isDev,
    returnEmptyString: false,
    preload: languages,
    supportedLngs: languages,

    interpolation: {
      escapeValue: false
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  })

export default i18n
