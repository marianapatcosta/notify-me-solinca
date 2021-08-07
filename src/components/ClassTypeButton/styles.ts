import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'

export const StyledContainer = styled.TouchableOpacity`
  width: 100px;
  height: 80px;
`

export const StyledClassesType = styled(LinearGradient)<{
  isSelected?: boolean
}>`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  ${({ isSelected }) => (!isSelected ? `opacity: 0.5;` : `opacity: 1;`)}
`
