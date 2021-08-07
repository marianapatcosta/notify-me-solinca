import * as Localisation from 'expo-localization'
import i18n from 'i18n-js'
import translationEN from './locales/en/translation.json'
import translationPT from './locales/pt/translation.json'

i18n.translations = {
  en: translationEN,
  pt: translationPT,
}

i18n.locale = Localisation.locale
i18n.fallbacks = true

export default i18n
