import React, {
  useEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
} from 'react'
import { Alert, useColorScheme } from 'react-native'
import { useAsyncStorage } from './useAsyncStorage'
import { ThemeProvider } from 'styled-components'
import { COLLECTION_THEME } from '../utils/constants'
import { useLocale } from './useLocale'
import themes from '../themes'

type Theme = 'light' | 'dark'

type ThemeProviderProps = {
  children: ReactNode
}

type ThemeContextData = {
  currentTheme: Theme
  defineTheme: (theme: Theme) => Promise<void>
}

const ThemeContext = createContext({} as ThemeContextData)

const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    (useColorScheme() as Theme) || 'dark'
  )
  const { getStoredItem, saveItemInStorage } = useAsyncStorage()

  const { t } = useLocale()

  const getStoredTheme = async () => {
    try {
      const storedTheme = await getStoredItem(COLLECTION_THEME)
      if (!!storedTheme) {
        setCurrentTheme(storedTheme)
      }
    } catch (error) {
      Alert.alert(t('global.anErrorOccurred'))
    }
  }

  const defineTheme = async (theme: Theme) => {
    try {
      setCurrentTheme(theme)
      await saveItemInStorage(COLLECTION_THEME, theme)
    } catch (error) {
      Alert.alert(t('global.anErrorOccurred'))
    }
  }

  useEffect(() => {
    getStoredTheme()
  }, [])

  return (
    <ThemeContext.Provider value={{ defineTheme, currentTheme }}>
      <ThemeProvider theme={themes[currentTheme]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  return themeContext
}

export { Theme, ThemeContextProvider, useTheme }
