import styled from 'styled-components/native'

export const StyledContainer = styled.View`
  flex: 1;
`

export const StyledOverlay = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.overlay};
`

export const StyledBar = styled.View`
  width: 40px;
  height: 2px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-self: center;
  margin-top: 50px;
  position: absolute;
`
