import React, { ReactNode } from 'react'
import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components'
import {
  StyledContainer,
  StyledInputWrapper,
  StyledInput,
  StyledError,
} from './styles'

type InputProps = TextInputProps & {
  icon?: ReactNode
  error?: string
}

export const Input = ({ icon, error, ...otherProps }: InputProps) => {
  const theme = useTheme()
  return (
    <StyledContainer>
      <StyledInputWrapper>
        <StyledInput
          {...otherProps}
          hasIcon={!!icon}
          maxLength={50}
          placeholderTextColor={theme.colors.disabled}
        />
        {icon}
      </StyledInputWrapper>

      {!!error && <StyledError>{error}</StyledError>}
    </StyledContainer>
  )
}
