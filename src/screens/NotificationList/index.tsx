import React, { useCallback } from 'react'
import { FlatList } from 'react-native'
import { Header, Notification } from '../../components'
import { useLocale } from '../../hooks/useLocale'
import { useNotifications } from '../../hooks/notifications'
import { useFocusEffect } from '@react-navigation/native'
import {
  StyledContainer,
  StyledContent,
  StyledNoData,
  StyledDeleteAll,
  StyledDeleteAllText,
} from './styles'

export const NotificationList = () => {
  const { t } = useLocale()
  const {
    notifications,
    deleteNotification,
    deleteAllNotifications,
    resetNewNotifications,
  } = useNotifications()

  useFocusEffect(
    useCallback(() => {
      resetNewNotifications()
    }, [])
  )

  return (
    <StyledContainer>
      <Header title={t('notifications.title')} />
      <StyledContent>
        {!notifications.length ? (
          <StyledNoData>{t('notifications.noNotifications')}</StyledNoData>
        ) : (
          <FlatList
            data={notifications}
            renderItem={({ item }) => (
              <Notification
                notification={item}
                handleDelete={() => deleteNotification(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <StyledDeleteAll onPress={deleteAllNotifications}>
                <StyledDeleteAllText>
                  {t('notifications.deleteAll')}
                </StyledDeleteAllText>
              </StyledDeleteAll>
            )}
          />
        )}
      </StyledContent>
    </StyledContainer>
  )
}
