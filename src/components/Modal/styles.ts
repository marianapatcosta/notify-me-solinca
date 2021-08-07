import styled from 'styled-components/native'
import { StyledRegularText, StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const StyledTitleContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
`

export const StyledTitle = styled(StyledTitleText)`
  color: ${({ theme }) => theme.colors.highlight50};
`

export const StyledMessage = styled(StyledRegularText)`
  font-size: 18px;
  margin: 8px 0;
`

export const StyledButtons = styled.View`
  margin-bottom: 40px;
  margin-top: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const StyledButtonContainer = styled.View`
  flex: 1;
`

export const StyledButton = styled.TouchableOpacity<{
  isConfirmModal?: boolean
}>`
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.highlight50};
  justify-content: center;
  margin-right: 4px;
  max-width: 150px;
  min-width: 150px;
  border-radius: 8px;

  ${({ isConfirmModal, theme }) =>
    !isConfirmModal &&
    `align-self: center; background-color: ${theme.colors.highlight50}`}
`

export const StyledConfirmButton = styled(StyledButton)`
  background-color: ${({ theme }) => theme.colors.highlight50};
  margin-left: 4px;
  margin-right: 0;
`

export const StyledButtonLabel = styled(StyledRegularText)<{
  isConfirmModal?: boolean
}>`
  text-align: center;

  ${({ isConfirmModal, theme }) =>
    !isConfirmModal && `color: ${theme.colors.title}`}
`
