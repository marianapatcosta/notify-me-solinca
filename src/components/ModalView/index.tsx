import React, { ReactNode } from 'react'
import { Modal, ModalProps, TouchableWithoutFeedback, View } from 'react-native'

import { StyledContainer, StyledOverlay, StyledBar } from './styles'

type ModalViewProps = ModalProps & {
  children: ReactNode
  containerStyle?: object
  hasTopBar?: boolean
  marginTop?: number
  closeModal: () => void
}

export const ModalView = ({
  children,
  closeModal,
  hasTopBar = false,
  marginTop,
  containerStyle,
  ...otherProps
}: ModalViewProps) => {
  return (
    <Modal
      transparent
      animationType='slide'
      statusBarTranslucent
      {...otherProps}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <StyledOverlay>
          <View style={{ flex: 1 }}>
            {hasTopBar && <StyledBar />}
            <StyledContainer style={{ ...containerStyle }}>{children}</StyledContainer>
          </View>
        </StyledOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
