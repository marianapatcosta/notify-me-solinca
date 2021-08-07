import React from 'react'
import { ActivityIndicator, ViewProps } from 'react-native'
import { useTheme } from 'styled-components'
import { StyledContainer } from './styles'

export const Loading = (props: ViewProps) => {
  const theme = useTheme()

  return (
    <StyledContainer
      animationType='none'
      containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
      {...props}
    >
      <ActivityIndicator
        size='large'
        color={theme.colors.highlight50}
        style={{ alignSelf: 'center' }}
      />
    </StyledContainer>
  )
}
