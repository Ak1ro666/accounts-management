import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { languages } from "./data";

i18n.use(initReactI18next).init({
  lng: languages[0],
  fallbackLng: languages[0],

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  resources: { ru: { translationsNS: {} } },
});

export default i18n;
