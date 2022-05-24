import { useContext } from 'react'

import { TeamsUiContext } from '../Provider/TeamsUiContext'
import enUS from './en-US'

export type Dir = 'ltr' | 'rtl'

export type Translations = {
  dir: Dir
  locale: string
  [key: string]: string
}

export const defaultTranslations = enUS

export const getTranslation = (
  translations: Translations,
  key: string
): string => (translations.hasOwnProperty(key) ? translations[key] : key)

export const useTranslations = () => {
  const translations = useContext(TeamsUiContext).translations
  return (key: string): string => getTranslation(translations, key)
}
