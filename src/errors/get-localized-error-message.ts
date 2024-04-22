import * as messages from './messages'
import {Locale} from "../structures/locale";

export function getLocalizedErrorMessage(key: string, replace: {
  [key: string]: any
} = {}, locale: Locale = 'ru'): string {
  const keys: string[] = key.split('.')

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
