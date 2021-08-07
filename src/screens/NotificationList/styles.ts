import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  flex: 1;
`

export const StyledContent = styled.View`
  padding: 24px 24px 0;
  flex: 1;
`

export const StyledNoData = styled(StyledRegularText)`
  font-style: italic;
  text-align: center;
  margin-top: 96px;
`

export const StyledDeleteAll = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 8px;
`

export const StyledDeleteAllText = styled(StyledRegularText)`
  color: ${({ theme }) => theme.colors.highlight50};
`
