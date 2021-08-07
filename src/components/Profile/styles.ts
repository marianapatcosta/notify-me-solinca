import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  flex-direction: row;
`

export const StyledUser = styled.View`
  flex-direction: row;
  align-items: flex-start;
`

export const StyledText = styled.View`
  margin-left: 12px;
  justify-content: space-between;
`

export const StyledGreeting = styled(StyledRegularText)`
  margin-right: 6px;
  color: ${({ theme }) => theme.colors.title};
`

export const StyledUsername = styled(StyledRegularText)`
  color: ${({ theme }) => theme.colors.title};
`

export const StyledMessage = styled(StyledRegularText)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.title};
`
