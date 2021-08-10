import React from 'react'
import { View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useLocale } from '../../hooks/useLocale'
import { useTheme } from 'styled-components'
import { formatDate } from '../../utils/format-date'
import { NotificationType, ClassNotificationInfo } from '../../utils/constants'
import {
  StyledContainer,
  StyledHeader,
  StyledClub,
  StyledTitle,
  StyledSubtitle,
  StyledDate,
  StyledItem,
  StyledClass,
  StyledDivider,
  StyledDelete,
  StyledBody,
} from './styles'

type NotificationProps = {
  notification: NotificationType
  handleDelete: () => void
}

export const Notification = ({
  notification: { id, date, title, body, data },
  handleDelete,
}: NotificationProps) => {
  const { t } = useLocale()
  const theme = useTheme()

  const classes: ClassNotificationInfo[] = data.classes

  const getClassDetail = (classDetail: string): string => {
    const [weekDay, ...classDetailsArray] = classDetail.split(' ')
    let day = weekDay
    if (classDetailsArray[0] === 'Hoje') {
      day = t('notifications.today')
    }

    if (classDetailsArray[0] === 'Amanhã') {
      day = t('notifications.tomorrow')
    }

    return `${day} ${classDetailsArray.join(' ')}`
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>{formatDate(date)}</StyledDate>
      </StyledHeader>
      <StyledSubtitle>{body}</StyledSubtitle>
      <StyledBody>
        <View>
          {classes.map(({ club, classesDetails }: ClassNotificationInfo) => (
            <StyledItem key={`${id}-classes-${club}`}>
              <StyledClub>{club}</StyledClub>
              {classesDetails.map((detail: string) => (
                <StyledClass
                  key={`${id}-class-${detail}`}
                  style={{ textAlignVertical: 'bottom' }}
                >
                  {getClassDetail(detail)}
                </StyledClass>
              ))}
            </StyledItem>
          ))}
        </View>
        <StyledDelete onPress={handleDelete}>
          <MaterialIcons
            name='delete'
            size={30}
            color={theme.colors.highlight50}
          />
        </StyledDelete>
      </StyledBody>
      <StyledDivider />
    </StyledContainer>
  )
}
