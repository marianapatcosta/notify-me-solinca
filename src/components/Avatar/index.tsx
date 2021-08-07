import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { StyledContainer, StyledAvatar } from './styles'

type AvatarProps = {
  urlImage?: string
  large?: boolean
  hasMarginRight?: boolean
}

export const Avatar = ({ urlImage, large, hasMarginRight }: AvatarProps) => {
  const theme = useTheme()
  const { primary, secondary, font } =
    theme.colors

  return (
    <StyledContainer
      style={{
        width: large ? 75 : 49,
        height: large ? 75 : 49,
        marginRight: hasMarginRight ? 22 : 0,
      }}
      colors={[secondary, font]}
    >
      {!!urlImage ? (
        <StyledAvatar
          style={{ width: large ? 72 : 46, height: large ? 72 : 46 }}
          source={{ uri: urlImage }}
        />
      ) : (
        <Ionicons
          name={'person-circle-outline'}
          size={large ? 72 : 46}
          color={primary}
        />
      )}
    </StyledContainer>
  )
}
