import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.KeyboardAvoidingView`
  flex: 1;
`

export const StyledContent = styled.View`
  padding: 50px 10%;
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const StyledLinkBottom = styled(StyledRegularText)`
  font-size: 14px;
  line-height: 30px;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.highlight50};
`
