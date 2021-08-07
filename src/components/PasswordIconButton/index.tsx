import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'
import { StyledIconButton } from './styles'

type PasswordIconButtonProps = TouchableOpacityProps & {
  showPassword: boolean
  onPress: () => void
}

export const PasswordIconButton = ({
  showPassword,
  onPress,
}: PasswordIconButtonProps) => {
  const theme = useTheme()
  return (
    <StyledIconButton onPress={onPress}>
      <Ionicons
        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
        size={20}
        color={theme.colors.highlight50}
      />
    </StyledIconButton>
  )
}
