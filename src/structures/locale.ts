export type Locale = 'ru' | 'en' | 'uz'

export function isLocale(value: any) {
  return value === 'ru' || value === 'uz' || value === 'en'
}

export interface LocalizedObject {
  ru: string,
  uz: string,
  en: string
}
