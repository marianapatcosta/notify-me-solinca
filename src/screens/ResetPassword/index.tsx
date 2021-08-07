import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { useForm, Control } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Header,
  Loading,
  ModalView,
  Modal,
  ControlledInput,
} from '../../components'
import { useHttpRequest, RequestMethod } from '../../hooks/useHttpRequest'
import { useLocale } from '../../hooks/useLocale'
import { StyledContainer, StyledContent } from './styles'
import { emailRegex, HTTP_METHODS } from '../../utils/constants'

type ResetPasswordData = {
  email: string
  control?: Control<FieldsType>
}

export const ResetPassword = () => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const { sendRequest, error, clearError, isLoading } = useHttpRequest()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordData>()
  const [successRequest, setSuccessRequest] = useState<boolean>(false)

  const handleResetPassword = async (data: ResetPasswordData) => {
    const userData = {
      email: data.email.trim(),
    }
    try {
      await sendRequest(
        '/user/reset-password',
        HTTP_METHODS.POST as RequestMethod,
        {},
        userData
      )
      setSuccessRequest(true)
      reset()
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleCloseModal = () => {
    clearError()
    setSuccessRequest(false)
    if (successRequest) {
      const timerId = setTimeout(() => {
        navigation.navigate('SignIn')
        clearTimeout(timerId)
      }, 1000)
    }
  }

  return (
    <StyledContainer>
      <Header title={t('authentication.resetPassword')} />
      <StyledContent>
        {isLoading ? (
          <Loading />
        ) : (
          <View>
            <ControlledInput
              control={control}
              rules={{
                required: true,
                pattern: emailRegex,
              }}
              name='email'
              placeholder={t('authentication.email')}
              error={!!errors.email ? t('authentication.emailError') : ''}
            />
            <Button
              style={{ marginTop: 24 }}
              label={t('authentication.resetPassword').toLowerCase()}
              onPress={() => handleSubmit(handleResetPassword)()}
            />
          </View>
        )}
      </StyledContent>
      <ModalView
        visible={!!error || successRequest}
        containerStyle={{ marginTop: Dimensions.get('window').height - 300 }}
        closeModal={handleCloseModal}
      >
        <Modal
          title={
            !!error ? t('global.anErrorOccurred') : t('global.requestSent')
          }
          message={
            !!error
              ? t('authentication.resetPasswordError')
              : t('authentication.resetPasswordSuccess')
          }
          onCancel={handleCloseModal}
        />
      </ModalView>
    </StyledContainer>
  )
}
