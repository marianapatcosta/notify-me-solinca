import styled from 'styled-components/native'
import { StyledRegularText, StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  border-radius: 8px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`

export const StyledHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const StyledClub = styled(StyledTitleText)`
  color: ${({ theme }) => theme.colors.highlight50};
  font-size: 28px;
  padding-bottom: 8px;
`

export const StyledTitle = styled(StyledTitleText)`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.font};
`

export const StyledSubtitle = styled(StyledRegularText)`
  font-size: 16px;
  margin-bottom: 4px;
`

export const StyledItem = styled.View`
  margin: 8px 0;
`

export const StyledDate = styled(StyledRegularText)`
  font-size: 16px;
  font-weight: 700;
  font-style: italic;
`

export const StyledClass = styled(StyledRegularText)`
  line-height: 28px;
  text-transform: capitalize;
`

export const StyledDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin: 8px 0 16px;
`

export const StyledBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const StyledDelete = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  align-self: flex-end;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 12px;
`
