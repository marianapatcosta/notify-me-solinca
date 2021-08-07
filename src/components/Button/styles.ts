import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled(RectButton)`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.highlight50};
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
`

export const StyledLabel = styled(StyledTitleText)`
  flex: 1;
  text-align: center;
  font-size: 28px;
  margin: auto;
`
