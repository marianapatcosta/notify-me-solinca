import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { decode, encode } from 'base-64'
import { AppProvider } from './src/contexts'
import { useLocale } from './src/hooks/useLocale'
import { Routes } from './src/routes'

export default function App() {
  const { getStoredLocale } = useLocale()
  const [areFontsLoaded] = useFonts({
    Uchen: require('./src/assets/fonts/Uchen-Regular.ttf'),
    ZenLoop: require('./src/assets/fonts/ZenLoop-Regular.ttf'),
  })

  if (!global.btoa) {
    global.btoa = encode
  }

  if (!global.atob) {
    global.atob = decode
  }

  useEffect(() => {
    getStoredLocale()
  }, [])

  if (!areFontsLoaded) {
    return <AppLoading />
  }

  return (
    <AppProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Routes />
    </AppProvider>
  )
}
