import styled from 'styled-components/native'

export const StyledContainer = styled.View`
  flex: 1;
`

export const StyledContent = styled.View`
  padding: 50px;
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-top: 80px;
`
