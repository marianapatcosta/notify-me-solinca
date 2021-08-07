import React, { ReactNode } from 'react'
import { useLocale } from '../../hooks/useLocale'
import {
  StyledContainer,
  StyledTitleContainer,
  StyledTitle,
  StyledMessage,
  StyledButtons,
  StyledButtonContainer,
  StyledButton,
  StyledConfirmButton,
  StyledButtonLabel,
} from './styles'

type ModalProps = {
  title: string | ReactNode
  onCancel: () => void
  message?: string
  onConfirm?: () => void
}

export const Modal = ({ title, message, onConfirm, onCancel }: ModalProps) => {
  const { t } = useLocale()
  const isConfirmModal: boolean = !!onConfirm
  return (
    <StyledContainer accessible={true}>
      <StyledTitleContainer>
        <StyledTitle>{title}</StyledTitle>
      </StyledTitleContainer>
      {!!message && <StyledMessage>{message}</StyledMessage>}
      <StyledButtons>
        <StyledButtonContainer>
          <StyledButton isConfirmModal={isConfirmModal} onPress={onCancel}>
            <StyledButtonLabel isConfirmModal={isConfirmModal}>
              {isConfirmModal ? t('global.no') : t('global.ok')}
            </StyledButtonLabel>
          </StyledButton>
        </StyledButtonContainer>
        {isConfirmModal && (
          <StyledButtonContainer>
            <StyledConfirmButton onPress={onConfirm}>
              <StyledButtonLabel>{t('global.yes')}</StyledButtonLabel>
            </StyledConfirmButton>
          </StyledButtonContainer>
        )}
      </StyledButtons>
    </StyledContainer>
  )
}
