import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  flex: 1;
  `

export const StyledContent = styled.View`
  padding: 0 5%;
  flex: 1;
`

export const StyledHeader = styled(LinearGradient)`
  height: 150px;
  width: 100%;
  align-content: center;
  padding: ${getStatusBarHeight() + 26}px 5% 42px;
  background-color: ${({ theme }) => theme.colors.highlight50};
  margin-bottom: 16px;
`

export const StyledTitle = styled(StyledRegularText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.font};
`
export const StyledClassesTypes = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 16px;
`
