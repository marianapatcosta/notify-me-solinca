import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  width: 100%;
  margin-bottom: 16px;
`

export const StyledInputWrapper = styled.View`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  padding: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`

export const StyledInput = styled.TextInput<{ hasIcon?: boolean }>`
  height: 48px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.font};
  border-color: ${({ theme }) => theme.colors.highlight50};

  ${({ hasIcon }) =>
    !hasIcon
      ? ` 
      width: 100%;`
      : `flex: 1;`}
`

export const StyledError = styled(StyledRegularText)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.red};
`
