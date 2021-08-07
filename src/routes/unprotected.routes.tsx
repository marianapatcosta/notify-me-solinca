import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { SignIn, SignUp, ResetPassword } from '../screens'
import { useTheme } from 'styled-components'

const { Navigator, Screen } = createStackNavigator()

export const UnprotectedRoutes = () => {
  const theme = useTheme()

  return (
    <Navigator
      headerMode='none'
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Screen name='SignIn' component={SignIn} />
      <Screen name='SignUp' component={SignUp} />
      <Screen name='ResetPassword' component={ResetPassword} />
    </Navigator>
  )
}
