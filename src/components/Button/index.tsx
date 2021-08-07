import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { StyledContainer, StyledLabel } from './styles'

type ButtonProps = RectButtonProps & {
  label: string
}

export const Button = ({ label, ...otherProps }: ButtonProps) => {
  return (
    <StyledContainer {...otherProps}>
      <StyledLabel>{label}</StyledLabel>
    </StyledContainer>
  )
}
