import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled(LinearGradient)`
  width: 100%;
  height: 104px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${getStatusBarHeight()}px 24px 0;
`

export const StyledTitle = styled(StyledTitleText)`
  flex: 1;
  text-align: center;
`
