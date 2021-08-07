import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { UnprotectedRoutes } from './unprotected.routes'
import { ProtectedRoutes } from './protected.routes'
import { useAuth } from '../hooks/auth'

export const Routes = () => {
  const { user } = useAuth()
  const theme = useTheme()

  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.primary,
    },
  }

  return (
    <NavigationContainer theme={appTheme}>
      {!user?.userId ? <UnprotectedRoutes /> : <ProtectedRoutes />}
    </NavigationContainer>
  )
}
