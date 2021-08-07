import styled from 'styled-components/native'

export const StyledRegularText = styled.Text`
  color: ${({ theme }) => theme.colors.font};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 18px;
`

export const StyledSubText = styled(StyledRegularText)`
  font-size: 12px;
  line-height: 37px;
  font-weight: 700;
  padding-right: 5px;
`

export const StyledTitleText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.emphasis};
  font-size: 44px;
`

