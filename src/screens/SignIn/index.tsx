import React, { useState } from 'react'
import { View, TouchableOpacity, Platform, Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  Button,
  Input,
  Loading,
  Modal,
  ModalView,
  PasswordIconButton,
} from '../../components'
import GymIconsImg from '../../assets/images/gym-icons.png'
import { useAuth, User } from '../../hooks/auth'
import { useLocale } from '../../hooks/useLocale'
import { useHttpRequest, RequestMethod } from '../../hooks/useHttpRequest'
import { useNotifications } from '../../hooks/notifications'
import { encryptPassword, HTTP_METHODS } from '../../utils/constants'
import {
  StyledContainer,
  StyledImageWrapper,
  StyledImage,
  StyledTitle,
  StyledSubtitle,
  StyledContent,
  StyledLink,
  StyledLinkBottom,
} from './styles'

type SignInData = {
  username: string
  password: string
}

export const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { t } = useLocale()
  const navigation = useNavigation()
  const { registerForPushNotificationsAsync } = useNotifications()
  const { isLoading, signIn, onAuthenticationSuccess, error, clearError } =
    useAuth()
  const { sendRequest } = useHttpRequest()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInData>()

  const toggleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSignIn = async (data: SignInData) => {
    try {
      const userData = {
        username: data.username.trim(),
        password: encryptPassword(data.password.trim()),
      }

      const responseData: User = await signIn(userData)
      const expoPushToken = await registerForPushNotificationsAsync()
      await sendRequest(
        `/user/${responseData.userId}`,
        HTTP_METHODS.PATCH as RequestMethod,
        { Authorization: `Bearer ${responseData.token}` },
        { expoPushToken }
      )
      await onAuthenticationSuccess(responseData)
    } catch (error) {
      setErrorMessage(
        error.request.status === 403
          ? t('authentication.credentialsError')
          : t('authentication.loginError')
      )
    }
  }

  const handleGoToSignUp = () => {
    reset()
    navigation.navigate('SignUp')
  }

  const handleGoToResetPassword = () => {
    reset()
    navigation.navigate('ResetPassword')
  }

  return (
    <StyledContainer
      accessible={true}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%' }}
      >
        <StyledImageWrapper>
          <StyledImage
            source={GymIconsImg}
            resizeMode='cover'
            accessibilityLabel='app image'
          />
        </StyledImageWrapper>
        <StyledContent>
          <StyledTitle>{t('authentication.title')}</StyledTitle>
          <StyledSubtitle>{t('authentication.subtitle')}</StyledSubtitle>
          {isLoading ? (
            <Loading />
          ) : (
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={t('authentication.username')}
                    error={
                      !!errors.username ? t('authentication.usernameError') : ''
                    }
                  />
                )}
                name='username'
                defaultValue=''
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 8,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={t('authentication.password')}
                    secureTextEntry={!showPassword}
                    error={
                      !!errors.password
                        ? t('authentication.passwordError', {
                            characters: '8',
                          })
                        : ''
                    }
                    icon={
                      <PasswordIconButton
                        showPassword={showPassword}
                        onPress={toggleShowPassword}
                      />
                    }
                  />
                )}
                name='password'
                defaultValue=''
              />
              <Button
                label={t('authentication.login')}
                onPress={() => handleSubmit(handleSignIn)()}
              />
              <TouchableOpacity onPress={handleGoToResetPassword}>
                <StyledLink>{t('authentication.forgotPassword')}</StyledLink>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleGoToSignUp}>
                <StyledLinkBottom>
                  {t('authentication.createAccount')}
                </StyledLinkBottom>
              </TouchableOpacity>
            </View>
          )}
        </StyledContent>
      </ScrollView>
      <ModalView
        visible={!!error}
        containerStyle={{ marginTop: Dimensions.get('window').height - 300 }}
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
