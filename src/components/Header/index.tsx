import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { StyledContainer, StyledTitle } from './styles'

type HeaderProps = {
  title: string
  action?: ReactNode
}

export const Header = ({ title, action }: HeaderProps) => {
  const navigation = useNavigation()

  const theme = useTheme()
  const { highlight50, highlight90, title: colorTitle } = theme.colors

  const handleGoBack = () => navigation.goBack()

  return (
    <StyledContainer colors={[highlight90, highlight50]}>
      <BorderlessButton onPress={handleGoBack}>
        <Feather name='arrow-left' size={24} color={colorTitle} />
      </BorderlessButton>
      <StyledTitle>{title}</StyledTitle>
      {!!action ? <View>{action}</View> : <View style={{ width: 24 }} />}
    </StyledContainer>
  )
}
