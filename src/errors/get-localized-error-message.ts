import * as messages from './messages'
import {Locale} from "../structures/locale";
import {getAppLocale} from "../config/locale";

export function getLocalizedErrorMessage(key: string, replace: {
  [key: string]: any
} = {}, locale: Locale | null = null): string {
  const keys: string[] = key.split('.')

  if (!locale) {
    locale = getAppLocale()
  }

  let value: any = messages[locale]

  for (const k of keys) {
    if (value[k] !== undefined) {
      value = value[k];
    } else {
      return key;
    }
  }

  if (typeof value !== 'string') {
    return key
  }

  for (let k of Object.keys(replace)) {
    value = value.replace(`:${k}`, replace[k])
  }

  return value;
}
