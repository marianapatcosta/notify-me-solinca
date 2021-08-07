import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Switch, Platform, RefreshControl } from 'react-native'
import { useTheme } from 'styled-components/native'
import {
  Button,
  DropDown,
  Header,
  ModalView,
  Modal,
  Loading,
} from '../../components'
import { useAuth } from '../../hooks/auth'
import { useHttpRequest, RequestMethod } from '../../hooks/useHttpRequest'
import { useLocale } from '../../hooks/useLocale'
import { CLASSES, HTTP_METHODS } from '../../utils/constants'
import {
  StyledContainer,
  StyledContent,
  StyledRow,
  StyledColumn,
  StyledLabel,
} from './styles'

enum DROPDOWN_TYPES {
  CLUBS = 'clubs',
  OPEN_AIR_CLUBS = 'open-air-clubs',
  CLASSES = 'classes',
}

export const NotificationSettings = () => {
  const { user } = useAuth()
  const { t } = useLocale()
  const { sendRequest, error, clearError, isLoading } = useHttpRequest()
  const theme = useTheme()
  const { highlight50, secondary, title } = theme.colors
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [fetchedClubs, setFetchedClubs] = useState([])
  const [fetchedOpenAirClubs, setFetchedOpenAirClubs] = useState([])
  const [selectedClubs, setSelectedClubs] = useState([])
  const [selectedOpenAirClubs, setSelectedOpenAirClubs] = useState([])
  const [selectedClasses, setSelectedClasses] = useState([])
  const [isWatcherOn, setIsWatcherOn] = useState(false)
  const [isOpenAirWatcherOn, setIsOpenAirWatcherOn] = useState(false)
  const [isNotificationRepeatOn, setIsNotificationRepeatOn] = useState(false)
  const [openedDropDown, setOpenedDropdown] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  const getClasses = () =>
    CLASSES.sort().map((className) => ({
      label: className,
      value: className,
    }))

  const handleCloseModal = () => {
    clearError()
    setSuccessMessage('')
  }

  const handleSubmitPreferences = async () => {
    try {
      const body = {
        classesToWatch: selectedClasses,
        selectedClubs: fetchedClubs.filter(({ name }) =>
          selectedClubs.includes(name)
        ),
        selectedOpenAirClubs: fetchedOpenAirClubs.filter(({ name }) =>
          selectedOpenAirClubs.includes(name)
        ),
        isWatcherOn,
        isOpenAirWatcherOn,
        isNotificationRepeatOn,
      }
      await sendRequest(
        `/user/${user.userId}`,
        HTTP_METHODS.PATCH as RequestMethod,
        {},
        body
      )
      setOpenedDropdown('')
      setSuccessMessage(t('notificationsSettings.submissionSuccess'))
      await fetchUserConfigs()
    } catch (error) {
      setErrorMessage(t('notificationsSettings.submissionError'))
    }
  }

  const fetchClubs = useCallback(async () => {
    try {
      const clubsData = await sendRequest(
        `/club/locations`,
        HTTP_METHODS.GET as RequestMethod
      )
      setFetchedClubs(
        clubsData.locations.sort((clubA, clubB) =>
          clubA.name < clubB.name ? -1 : 1
        )
      )
    } catch (error) {
      setErrorMessage(t('userData.clubsError'))
    }
  }, [sendRequest])

  const fetchOpenAirClubs = useCallback(async () => {
    try {
      const clubsData = await sendRequest(
        `/club/open-air-locations`,
        HTTP_METHODS.GET as RequestMethod
      )
      setFetchedOpenAirClubs(
        clubsData.locations.sort((clubA, clubB) =>
          clubA.name < clubB.name ? -1 : 1
        )
      )
    } catch (error) {
      setErrorMessage(t('userData.clubsError'))
    }
  }, [sendRequest])

  const fetchUserConfigs = useCallback(async () => {
    try {
      const userData = await sendRequest(
        `/user/${user.userId}`,
        HTTP_METHODS.GET as RequestMethod
      )
      setSelectedClasses(userData.classesToWatch)
      setSelectedClubs(userData.selectedClubs.map(({ name }) => name))
      setSelectedOpenAirClubs(
        userData.selectedOpenAirClubs.map(({ name }) => name)
      )
      userData.isWatcherOn && setIsWatcherOn(userData.isWatcherOn)
      userData.isOpenAirWatcherOn &&
        setIsOpenAirWatcherOn(userData.isOpenAirWatcherOn)
      userData.isNotificationRepeatOn &&
        setIsNotificationRepeatOn(userData.isNotificationRepeatOn)
    } catch (error) {
      setErrorMessage(t('notificationsSettings.settingsError'))
    }
  }, [sendRequest])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([fetchUserConfigs(), fetchClubs(), fetchOpenAirClubs()])
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  useEffect(() => {
    fetchUserConfigs()
    fetchClubs()
    fetchOpenAirClubs()
  }, [])

  return (
    <>
      <StyledContainer>
        <Header title={t('notificationsSettings.title')} />
        <StyledContent
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={[highlight50]}
              progressBackgroundColor={title}
              tintColor={highlight50}
            />
          }
        >
          {isLoading && <Loading />}
          <StyledRow>
            <StyledLabel>{t('notificationsSettings.watchClasses')}</StyledLabel>
            <Switch
              trackColor={{ true: highlight50, false: secondary }}
              thumbColor={Platform.OS === 'android' ? highlight50 : ''}
              value={isWatcherOn}
              onValueChange={(newValue) => setIsWatcherOn(newValue)}
            />
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              {t('notificationsSettings.watchOpenAirClasses')}
            </StyledLabel>
            <Switch
              trackColor={{ true: highlight50, false: secondary }}
              thumbColor={Platform.OS === 'android' ? highlight50 : ''}
              value={isOpenAirWatcherOn}
              onValueChange={(newValue) => setIsOpenAirWatcherOn(newValue)}
            />
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              {t('notificationsSettings.repeatNotifications')}
            </StyledLabel>
            <Switch
              trackColor={{ true: highlight50, false: secondary }}
              thumbColor={Platform.OS === 'android' ? highlight50 : ''}
              value={isNotificationRepeatOn}
              onValueChange={(newValue) => setIsNotificationRepeatOn(newValue)}
            />
          </StyledRow>
          <StyledColumn>
            <StyledLabel>{t('notificationsSettings.selectClubs')}</StyledLabel>
            <DropDown
              multiple={true}
              disabled={!isWatcherOn}
              open={openedDropDown === DROPDOWN_TYPES.CLUBS}
              value={selectedClubs}
              items={fetchedClubs}
              schema={{ label: 'name', value: 'name' }}
              zIndex={3000}
              zIndexInverse={1000}
              placeholder={t('notificationsSettings.selectClubs')}
              multipleText={t('notificationsSettings.itemsSelected', {
                nrSelectedItems: selectedClubs.length,
              })}
              setOpen={() => setOpenedDropdown(DROPDOWN_TYPES.CLUBS)}
              setValue={setSelectedClubs}
              onClose={() => setOpenedDropdown('')}
            />
          </StyledColumn>
          <StyledColumn>
            <StyledLabel>
              {t('notificationsSettings.selectOpenAirClubs')}
            </StyledLabel>
            <DropDown
              multiple={true}
              disabled={!isOpenAirWatcherOn}
              open={openedDropDown === DROPDOWN_TYPES.OPEN_AIR_CLUBS}
              value={selectedOpenAirClubs}
              items={fetchedOpenAirClubs}
              schema={{ label: 'name', value: 'name' }}
              zIndex={2000}
              zIndexInverse={2000}
              placeholder={t('notificationsSettings.selectOpenAirClubs')}
              multipleText={t('notificationsSettings.itemsSelected', {
                nrSelectedItems: selectedOpenAirClubs.length,
              })}
              setOpen={() => setOpenedDropdown(DROPDOWN_TYPES.OPEN_AIR_CLUBS)}
              setValue={setSelectedOpenAirClubs}
              onClose={() => setOpenedDropdown('')}
            />
          </StyledColumn>
          <StyledColumn>
            <StyledLabel>
              {t('notificationsSettings.selectClasses')}
            </StyledLabel>
            <DropDown
              multiple={true}
              disabled={!isWatcherOn && !isOpenAirWatcherOn}
              open={openedDropDown === DROPDOWN_TYPES.CLASSES}
              value={selectedClasses}
              items={getClasses()}
              zIndex={1000}
              zIndexInverse={1000}
              placeholder={t('notificationsSettings.selectClasses')}
              multipleText={t('notificationsSettings.itemsSelected', {
                nrSelectedItems: selectedClasses.length,
              })}
              setOpen={() => setOpenedDropdown(DROPDOWN_TYPES.CLASSES)}
              setValue={setSelectedClasses}
              onClose={() => setOpenedDropdown('')}
            />
          </StyledColumn>
          <StyledColumn style={{ marginTop: 16, marginBottom: 165 }}>
            <Button
              label={t('global.submit')}
              onPress={handleSubmitPreferences}
            />
          </StyledColumn>
        </StyledContent>
      </StyledContainer>
      <ModalView
        visible={!!error || !!successMessage}
        containerStyle={{ marginTop: Dimensions.get('window').height - 250 }}
        closeModal={handleCloseModal}
      >
        <Modal
          title={
            !!error ? t('global.anErrorOccurred') : t('global.requestSent')
          }
          message={!!error ? errorMessage : successMessage}
          onCancel={handleCloseModal}
        />
      </ModalView>
    </>
  )
}
