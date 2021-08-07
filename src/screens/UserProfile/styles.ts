import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  flex: 1;
`

export const StyledContent = styled.ScrollView`
  padding: 24px 24px 0;
`

export const StyledHeader = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 26px;
  margin-bottom: 32px;
`

export const StyledColumn = styled.View`
  margin: 12px 0;
`

export const StyledDropDownWrapper = styled.View`
  margin-bottom: 12px;
`

export const StyledLabel = styled(StyledRegularText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.font};
  margin-right: 6px;
`

export const StyledField = styled(StyledRegularText)`
  color: ${({ theme }) => theme.colors.font};
`

export const StyledSection = styled.View`
  margin: 32px 0;
`

export const StyledSubtitle = styled(StyledLabel)`
  margin-bottom: 16px;
`
