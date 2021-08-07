import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useIsFocused } from '@react-navigation/native'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { PasswordIconButton } from '../../components/PasswordIconButton'
import { useLocale } from '../../hooks/useLocale'
import { emailRegex } from '../../utils/constants'

type UserData = {
  username?: string
  password: string
  confirmationPassword: string
  email: string
  solincaEmail: string
  solincaPassword: string
}

type UserFormProps = {
  defaultEmail?: string
  onSubmit: (data: any) => void
  buttonLabel: string
}

export const UserForm = ({
  defaultEmail,
  buttonLabel,
  onSubmit,
}: UserFormProps) => {
  const isEditMode = !!defaultEmail
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState<boolean>(false)
  const [showSolincaPassword, setShowSolincaPassword] = useState<boolean>(false)
  const { t } = useLocale()
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserData>()
  const isFocused = useIsFocused()

  const toggleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword)

  const toggleShowConfirmationPassword = () =>
    setShowConfirmationPassword(
      (prevShowConfirmationPassword) => !prevShowConfirmationPassword
    )

  const toggleShowSolincaPassword = () =>
    setShowSolincaPassword(
      (prevShowSolincaPassword) => !prevShowSolincaPassword
    )
  useEffect(() => {
    if (!isFocused) {
      reset({ email: defaultEmail })
    }
  }, [isFocused])

  return (
    <View>
      {!isEditMode && (
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
              error={!!errors.username ? t('authentication.usernameError') : ''}
            />
          )}
          name='username'
          defaultValue=''
        />
      )}
      <Controller
        control={control}
        rules={{
          required: !isEditMode,
          pattern: emailRegex,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('authentication.email')}
            error={!!errors.email ? t('authentication.emailError') : ''}
          />
        )}
        name='email'
        defaultValue={defaultEmail || ''}
      />
      <Controller
        control={control}
        rules={{
          required: !isEditMode || !!watch('confirmationPassword'),
          minLength: {
            value: 8,
            message: t('authentication.passwordError', {
              characters: '8',
            }),
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('authentication.password')}
            secureTextEntry={!showPassword}
            error={errors.password?.message}
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
      <Controller
        control={control}
        rules={{
          required: !isEditMode || !!watch('password'),
          validate: (value) => value === watch('password'),
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('authentication.confirmationPassword')}
            secureTextEntry={!showConfirmationPassword}
            error={
              !!errors.confirmationPassword
                ? t('authentication.confirmationPasswordError')
                : ''
            }
            icon={
              <PasswordIconButton
                showPassword={showConfirmationPassword}
                onPress={toggleShowConfirmationPassword}
              />
            }
          />
        )}
        name='confirmationPassword'
        defaultValue=''
      />
      <Controller
        control={control}
        rules={{
          required: !isEditMode || !!watch('solincaPassword'),
          pattern: emailRegex,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('authentication.solincaEmail')}
            error={!!errors.solincaEmail ? t('authentication.emailError') : ''}
          />
        )}
        name='solincaEmail'
        defaultValue=''
      />
      <Controller
        control={control}
        rules={{
          required: !isEditMode || !!watch('solincaEmail'),
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={t('authentication.solincaPassword')}
            secureTextEntry={!showSolincaPassword}
            error={
              !!errors.solincaPassword
                ? t('authentication.solincaPasswordError')
                : ''
            }
            icon={
              <PasswordIconButton
                showPassword={showSolincaPassword}
                onPress={toggleShowSolincaPassword}
              />
            }
          />
        )}
        name='solincaPassword'
        defaultValue=''
      />
      <Button
        label={buttonLabel.toLowerCase()}
        onPress={() => handleSubmit(onSubmit)()}
      />
    </View>
  )
}
