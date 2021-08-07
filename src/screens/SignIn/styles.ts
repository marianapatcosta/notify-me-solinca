import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { StyledRegularText, StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.highlight90};
`

export const StyledImageWrapper = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').height / 3}px;
  align-items: center;
`

export const StyledImage = styled.Image`
  width: 100%;
  height: ${Dimensions.get('window').height / 3 - 20}px;
  margin: auto;
  position: absolute;
  top: 36px;
  z-index: 1;
  border-radius: 16px;
`

export const StyledContent = styled.View`
  padding: 50px 10%;
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const StyledTitle = styled(StyledTitleText)`
  text-align: center;
  color: ${({ theme }) => theme.colors.font};
  margin-bottom: 8px;
`

export const StyledSubtitle = styled(StyledRegularText)`
  text-align: center;
  margin-bottom: 32px;
  line-height: 26px;
`

export const StyledLink = styled(StyledRegularText)`
  font-size: 14px;
  margin-top: 8px;
`

export const StyledLinkBottom = styled(StyledRegularText)`
  font-size: 14px;
  line-height: 30px;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.highlight50};
`
