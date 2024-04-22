import {Locale} from "../structures/locale";

let appLocale: Locale = 'uz'

function setAppLocale(locale: Locale) {
  appLocale = locale
}

function getAppLocale() {
  return appLocale
}

export {
  setAppLocale,
  getAppLocale
}
