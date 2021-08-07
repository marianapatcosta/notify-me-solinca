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
  margin-bottom: 52px;
`

export const StyledColumn = styled.View`
  padding-top: 12px;
`

export const StyledRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
`

export const StyledLabel = styled(StyledRegularText)``
