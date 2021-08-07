import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import {
  Home,
  NotificationList,
  NotificationSettings,
  UserProfile,
} from '../screens'
import { useNotifications } from '../hooks/notifications'

const { Navigator, Screen } = createBottomTabNavigator()

type Icons = {
  iconOnFocus: string
  icon: string
}

type TabIconsType = {
  Home: Icons
  NotificationList: Icons
  NotificationSettings: Icons
  UserProfile: Icons
}

export const ProtectedRoutes = () => {
  const theme = useTheme()
  const { highlight50, primary, font } = theme.colors
  const { badgeCount } = useNotifications()

  const tabIcons: TabIconsType = {
    Home: {
      icon: 'md-home-outline',
      iconOnFocus: 'md-home',
    },
    NotificationList: {
      icon: 'notifications-outline',
      iconOnFocus: 'notifications',
    },
    NotificationSettings: {
      icon: 'settings-outline',
      iconOnFocus: 'settings-sharp',
    },
    UserProfile: {
      icon: 'person-outline',
      iconOnFocus: 'person-sharp',
    },
  }

  type ProtectedScreens = keyof TabIconsType
  /* | 'Home'
  | 'NotificationList'
  | 'NotificationSettings'
  | 'UserProfile' */

  return (
    <Navigator
      screenOptions={({ route }) => ({
        cardStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const routeName = route.name as ProtectedScreens
          const { iconOnFocus, icon }: Icons = tabIcons[routeName]

          return (
            <Ionicons
              name={focused ? iconOnFocus : icon}
              size={size}
              color={color}
            />
          )
        },
      })}
      tabBarOptions={{
        activeTintColor: highlight50,
        inactiveTintColor: font,
        showLabel: false,
        style: { backgroundColor: primary /* borderTopWidth: 0  */ },
      }}
    >
      <Screen name='Home' component={Home} />
      <Screen
        name='NotificationList'
        component={NotificationList}
        options={{
          tabBarBadge: badgeCount ? badgeCount : undefined, // this number will be dynamic
          tabBarBadgeStyle: { backgroundColor: highlight50 },
        }}
      />

      <Screen name='NotificationSettings' component={NotificationSettings} />
      <Screen name='UserProfile' component={UserProfile} />
    </Navigator>
  )
}
