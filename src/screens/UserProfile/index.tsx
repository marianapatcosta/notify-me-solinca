import React, { useMemo, useState } from 'react'
import { View, Alert, Dimensions } from 'react-native'
import {
  Avatar,
  Button,
  DropDown,
  Header,
  Loading,
  ModalView,
  Modal,
  UserForm,
} from '../../components'
import {
  COLLECTION_USER_AUTH,
  getLocales,
  getThemes,
} from '../../utils/constants'
import { useTheme, Theme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/auth'
import { useLocale } from '../../hooks/useLocale'
import { useHttpRequest, RequestMethod } from '../../hooks/useHttpRequest'
import { encryptPassword, HTTP_METHODS } from '../../utils/constants'
import { StyledRegularText } from '../../themes/global-styles'
import {
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledColumn,
  StyledDropDownWrapper,
  StyledLabel,
  StyledField,
  StyledSection,
  StyledSubtitle,
} from './styles'
import { useAsyncStorage } from '../../hooks/useAsyncStorage'

enum DROPDOWN_TYPES {
  LOCALES = 'locales',
  THEMES = 'themes',
}

type UserData = {
  password?: string
  confirmationPassword?: string
  email?: string
  solincaEmail?: string
  solincaPassword?: string
  solincaAuth?: string
}

export const UserProfile = () => {
  const { user, signOut } = useAuth()
  const { currentTheme, defineTheme } = useTheme()
  const { currentLocale, defineLocale, t } = useLocale()
  const { getStoredItem, saveItemInStorage } = useAsyncStorage()
  const { sendRequest, error, clearError, isLoading } = useHttpRequest()
  const [selectedLocale, setSelectedLocale] = useState<string>(currentLocale)
  const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme)
  const [openedDropDown, setOpenedDropdown] = useState<string>('')
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>('')

  const locales = useMemo(() => getLocales(), [currentLocale])
  const themes = useMemo(() => getThemes(), [currentLocale])

  const forceUpdate: () => void = useState()[1].bind(null, {} as any)

  const handleUserDataSubmission = async (data: UserData) => {
    try {
      const userData = {} as UserData
      !!data?.email?.trim() &&
        data.email.trim() !== user.email &&
        (userData.email = data.email.trim())
      !!data.password &&
        (userData.password = encryptPassword(data.password.trim()))
      if (!!data.solincaEmail && !!data.solincaPassword) {
        userData.solincaAuth = window.btoa(
          `${data.solincaEmail.trim()}:${data.solincaPassword.trim()}`
        )
      }
      await sendRequest(
        `/user/${user.userId}`,
        HTTP_METHODS.PATCH as RequestMethod,
        {},
        userData
      )
      if (!!data?.email?.trim() && data.email.trim() !== user.email) {
        await updateUserData(data?.email?.trim())
      }
      setModalMessage(t('userProfile.submissionSuccess'))
    } catch (error) {
      setModalMessage(
        error.request.status === 403
          ? t('userProfile.wrongOldPassword')
          : t('userProfile.submissionError')
      )
    }
  }

  const updateUserData = async (email: string) => {
    const user = await getStoredItem(COLLECTION_USER_AUTH)
    await saveItemInStorage(COLLECTION_USER_AUTH, {
      ...user,
      email,
    })
  }

  const handleLocaleSelection = async (locale: string) => {
    try {
      defineLocale(locale)
      setOpenedDropdown('')
      forceUpdate()
    } catch (error) {
      Alert.alert(t('global.anErrorOccurred'))
    }
  }

  const handleThemeSelection = async (theme: Theme) => {
    defineTheme(theme)
    setOpenedDropdown('')
  }

  const handleOpenLogoutModal = () => {
    setOpenLogoutModal(true)
  }

  const handleCloseModal = () => {
    setOpenLogoutModal(false)
    clearError()
    setModalMessage('')
  }

  const getModalTitle = () => {
    if (!!error) {
      return t('global.anErrorOccurred')
    }

    if (!!modalMessage) {
      return t('global.requestSent')
    }

    return t('userProfile.confirmLogout')
  }
  return (
    <>
      <StyledContainer>
        <Header title={t('userProfile.title')} />
        <StyledContent showsVerticalScrollIndicator={false}>
          <StyledHeader>
            <View>
              <View>
                <StyledLabel>{t('userProfile.username')}</StyledLabel>
                <StyledField>{user.username}</StyledField>
              </View>
            </View>
            <Avatar large />
          </StyledHeader>
          <StyledColumn>
            <StyledSubtitle>{t('userProfile.preferences')}</StyledSubtitle>
            <StyledDropDownWrapper>
              <StyledRegularText>{t('userProfile.language')}</StyledRegularText>
              <DropDown
                open={openedDropDown === DROPDOWN_TYPES.LOCALES}
                value={selectedLocale}
                items={locales}
                zIndex={3000}
                zIndexInverse={1000}
                setOpen={() => setOpenedDropdown(DROPDOWN_TYPES.LOCALES)}
                setValue={setSelectedLocale}
                onChangeValue={(item) => handleLocaleSelection(item as string)}
                onClose={() => setOpenedDropdown('')}
              />
            </StyledDropDownWrapper>
            <StyledDropDownWrapper>
              <StyledRegularText>{t('userProfile.theme')}</StyledRegularText>
              <DropDown
                open={openedDropDown === DROPDOWN_TYPES.THEMES}
                value={selectedTheme}
                items={themes}
                zIndex={2000}
                zIndexInverse={2000}
                setOpen={() => setOpenedDropdown(DROPDOWN_TYPES.THEMES)}
                setValue={setSelectedTheme}
                onChangeValue={(item) => handleThemeSelection(item as Theme)}
                onClose={() => setOpenedDropdown('')}
              />
            </StyledDropDownWrapper>
          </StyledColumn>
          <View>
            <StyledSubtitle>{t('userProfile.userData')}</StyledSubtitle>
            {isLoading ? (
              <Loading />
            ) : (
              <UserForm
                defaultEmail={user.email}
                buttonLabel={t('global.submit')}
                onSubmit={handleUserDataSubmission}
              />
            )}
          </View>
          <StyledSection style={{ paddingBottom: 50 }}>
            <StyledSubtitle>{t('userProfile.logoutApp')}</StyledSubtitle>
            <Button
              label={t('userProfile.logout')}
              onPress={handleOpenLogoutModal}
            />
          </StyledSection>
        </StyledContent>
      </StyledContainer>
      <ModalView
        visible={openLogoutModal || !!error || !!modalMessage}
        containerStyle={{
          marginTop:
            Dimensions.get('window').height - (openLogoutModal ? 175 : 250),
        }}
        closeModal={handleCloseModal}
      >
        <Modal
          title={getModalTitle()}
          message={!!modalMessage ? modalMessage : ''}
          onConfirm={openLogoutModal ? signOut : undefined}
          onCancel={handleCloseModal}
        />
      </ModalView>
    </>
  )
}
