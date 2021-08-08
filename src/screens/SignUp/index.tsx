import React, { useState } from 'react'
import { View, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { Header, Loading, Modal, ModalView, UserForm } from '../../components'
import { useLocale } from '../../hooks/useLocale'
import { useAuth } from '../../hooks/auth'
import { encryptPassword, HTTP_METHODS } from '../../utils/constants'
import { useHttpRequest, RequestMethod } from '../../hooks/useHttpRequest'
import { useNotifications } from '../../hooks/notifications'
import { StyledContainer, StyledContent, StyledLinkBottom } from './styles'

type UserData = {
  username: string
  password: string
  confirmationPassword: string
  email: string
  solincaEmail: string
  solincaPassword: string
}

export const SignUp = () => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const { onAuthenticationSuccess } = useAuth()
  const { sendRequest, error, clearError, isLoading } = useHttpRequest()
  const { registerForPushNotificationsAsync } = useNotifications()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSignUp = async (data: UserData) => {
    try {
      const expoPushToken = await registerForPushNotificationsAsync()
      const userData = {
        username: data.username.trim(),
        email: data.email.trim(),
        password: encryptPassword(data.password.trim()),
        solincaAuth: window.btoa(
          `${data.solincaEmail.trim()}:${data.solincaPassword.trim()}`
        ),
        expoPushToken,
      }

      const responseData = await sendRequest(
        '/user/signup',
        HTTP_METHODS.POST as RequestMethod,
        {},
        userData
      )
      await onAuthenticationSuccess(responseData)
    } catch (error) {
      setErrorMessage(
        error.request?.status === 422
          ? t('authentication.existingUserError')
          : t('authentication.signUpError')
      )
    }
  }

  const handleGoToSignIn = () => navigation.navigate('SignIn')

  return (
    <StyledContainer
      accessible={true}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <Header title={t('authentication.signUp')} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <StyledContent>
          {isLoading && <Loading />}
          <View>
            <UserForm
              onSubmit={handleSignUp}
              buttonLabel={t('authentication.signUp')}
            />
            <TouchableOpacity onPress={handleGoToSignIn}>
              <StyledLinkBottom>
                {t('authentication.alreadyHaveAccount')}
              </StyledLinkBottom>
            </TouchableOpacity>
          </View>
        </StyledContent>
      </ScrollView>
      <ModalView
        visible={!!error}
        containerStyle={{ marginTop: Dimensions.get('window').height - 250 }}
        closeModal={clearError}
      >
        <Modal
          title={t('global.anErrorOccurred')}
          message={errorMessage}
          onCancel={clearError}
        />
      </ModalView>
    </StyledContainer>
  )
}
