import styled from 'styled-components/native'
import { StyledRegularText, StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  margin-bottom: 8px;
`

export const StyledClub = styled.View`
  padding-top: 16px;
`

export const StyledTitle = styled(StyledTitleText)`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.font};
`

export const StyledSubtitle = styled(StyledRegularText)`
  font-weight: 700;
  margin-bottom: 4px;
`

export const StyledNoData = styled(StyledRegularText)`
  font-style: italic;
`

export const StyledClass = styled(StyledRegularText)`
  line-height: 28px;
`

export const StyledDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: 8px 0;
`