import { Alert } from 'react-native'
import { Restart } from 'fiction-expo-restart'
import { useAsyncStorage } from './useAsyncStorage'
import { COLLECTION_LOCALE } from '../utils/constants'
import i18n from '../i18n'

type useLocalePropsData = {
  currentLocale: string
  t: (sentence: string, dynamicFields?: Object) => string
  getStoredLocale: () => Promise<void>
  defineLocale: (locale: string) => Promise<void>
}

const useLocale = (): useLocalePropsData => {
  const { getStoredItem, saveItemInStorage } = useAsyncStorage()

  const getStoredLocale = async () => {
    try {
      const storedLocale = await getStoredItem(COLLECTION_LOCALE)
      if (!!storedLocale) {
        i18n.locale = storedLocale
      }
    } catch (error) {
      Alert.alert(i18n.t('global.anErrorOccurred'))
    }
  }

  const defineLocale = async (locale: string) => {
    try {
      i18n.locale = locale
      await saveItemInStorage(COLLECTION_LOCALE, locale)
      Restart()
    } catch (error) {
      Alert.alert(i18n.t('global.anErrorOccurred'))
    }
  }

  return {
    currentLocale: i18n.locale,
    t: i18n.t,
    defineLocale,
    getStoredLocale,
  }
}

export { useLocale }
