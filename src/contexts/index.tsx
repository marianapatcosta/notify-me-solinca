import React, { ReactNode } from 'react'
import { AuthContextProvider } from '../hooks/auth'
import { NotificationsContextProvider } from '../hooks/notifications'
import { ThemeContextProvider } from '../hooks/useTheme'

type AppProviderProps = {
  children: ReactNode
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <NotificationsContextProvider>{children}</NotificationsContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}

export { AppProvider }
