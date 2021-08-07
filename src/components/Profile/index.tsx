import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import { useAuth } from '../../hooks/auth'
import { useLocale } from '../../hooks/useLocale'
import { getRandomSentence } from '../../utils/random-greeting'
import { Avatar } from '../Avatar'
import {
  StyledContainer,
  StyledUser,
  StyledText,
  StyledUsername,
  StyledGreeting,
  StyledMessage,
} from './styles'

export const Profile = () => {
  const { user } = useAuth()
  const { t, currentLocale } = useLocale()
  const randomGreetingSentence = useMemo(
    () => getRandomSentence(t('home.greetingSentences') as unknown as string[]),
    [currentLocale]
  )

  return (
    <StyledContainer>
      <Avatar large />
      <StyledText>
        <StyledUser>
          <StyledGreeting>{t('global.greeting')}</StyledGreeting>
          <StyledUsername>{user.username}</StyledUsername>
        </StyledUser>
        <StyledMessage>{randomGreetingSentence}</StyledMessage>
      </StyledText>
    </StyledContainer>
  )
}
