import React, { useCallback, useState, useEffect } from 'react'
import { Dimensions } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import * as Notifications from 'expo-notifications'
import {
  ClassesList,
  ClassTypeButton,
  Loading,
  Modal,
  ModalView,
  Profile,
} from '../../components'
import Indoors from '../../assets/svg/indoors.svg'
import OpenAir from '../../assets/svg/open-air.svg'
import { useAuth } from '../../hooks/auth'
import { useLocale } from '../../hooks/useLocale'
import { useHttpRequest, RequestMethod } from '../../hooks/useHttpRequest'
import {
  HTTP_METHODS,
  CLASS_TYPES,
  ClassType,
  ClassesData,
  ClassInfo,
} from '../../utils/constants'
import { useNotifications } from '../../hooks/notifications'
import {
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledClassesTypes,
} from './styles'

type ClassesResponse = {
  matchedClasses: ClassInfo[]
  otherClasses: ClassInfo[]
}

export const Home = () => {
  const { user } = useAuth()
  const { t } = useLocale()
  const theme = useTheme()
  const navigation = useNavigation()
  const { handleNewNotification } = useNotifications()
  const { highlight50, highlight90 } = theme.colors
  const { sendRequest, error, clearError, isLoading } = useHttpRequest()
  const initialClassesState = [
    {
      title: t('home.favoriteClasses'),
      data: [],
    },
    {
      title: t('home.otherClasses'),
      data: [],
    },
  ]
  const [availableClasses, setAvailableClasses] =
    useState<ClassesData[]>(initialClassesState)
  const [openAirAvailableClasses, setOpenAirAvailableClasses] =
    useState<ClassesData[]>(initialClassesState)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedClassType, setSelectedClassType] = useState<ClassType>(
    CLASS_TYPES.INDOORS
  )
  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  const handleSelectIndoorClasses = () =>
    setSelectedClassType(CLASS_TYPES.INDOORS)

  const handleSelectOpenAirClasses = () =>
    setSelectedClassType(CLASS_TYPES.OPEN_AIR)

  const fetchAvailableClasses = useCallback(async () => {
    try {
      const responseData: ClassesResponse = await sendRequest(
        '/club/classes',
        HTTP_METHODS.GET as RequestMethod,
        {}
      )
      setAvailableClasses((prevState) =>
        handleFetchClassesSuccess(prevState, responseData)
      )
    } catch (error) {
      setErrorMessage(t('home.classesError'))
    }
  }, [sendRequest])

  const fetchOpenAirAvailableClasses = useCallback(async () => {
    try {
      const responseData: ClassesResponse = await sendRequest(
        '/club/open-air-classes',
        HTTP_METHODS.GET as RequestMethod,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      setOpenAirAvailableClasses((prevState) =>
        handleFetchClassesSuccess(prevState, responseData)
      )
    } catch (error) {
      setErrorMessage(t('home.classesError'))
    }
  }, [sendRequest])

  const handleFetchClassesSuccess = (
    prevState: ClassesData[],
    responseData: ClassesResponse
  ) => {
    return [
      {
        ...prevState[0],
        data: responseData.matchedClasses,
      },
      {
        ...prevState[1],
        data: responseData.otherClasses,
      },
    ]
  }

  useFocusEffect(
    useCallback(() => {
      Promise.all([fetchAvailableClasses(), fetchOpenAirAvailableClasses()])
    }, [])
  )

  useEffect(() => {
    //   // listener fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    //   const notificationInteractionSubscription =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     handleNewNotification(response.notification, () =>
    //       navigation.navigate('NotificationList')
    //     )
    //   })

    // return () => {
    //   notificationInteractionSubscription.remove()
    // }

    // lastNotificationResponse returns the last notification the user interacted with and overcomes the fact that
    // useEffect in addNotificationResponseReceivedListener is called too late when app is launching (i.e. when the
    // user interacted with a notifications received when the app was killed/closed)
    if (lastNotificationResponse) {
      handleNewNotification(
        lastNotificationResponse.notification.request.trigger.remoteMessage,
        () => navigation.navigate('NotificationList')
      )
    }
  }, [lastNotificationResponse])

  return (
    <>
      <StyledContainer accessible={true}>
        <StyledHeader colors={[highlight90, highlight50]}>
          <Profile />
        </StyledHeader>
        <StyledContent>
          {isLoading && <Loading />}
          <StyledClassesTypes>
            <ClassTypeButton
              icon={Indoors}
              isSelected={selectedClassType === CLASS_TYPES.INDOORS}
              onPress={handleSelectIndoorClasses}
            />
            <ClassTypeButton
              icon={OpenAir}
              isSelected={selectedClassType === CLASS_TYPES.OPEN_AIR}
              onPress={handleSelectOpenAirClasses}
            />
          </StyledClassesTypes>
          <ClassesList
            selectedClassType={selectedClassType}
            availableClasses={availableClasses}
            openAirAvailableClasses={openAirAvailableClasses}
            onRefresh={() =>
              Promise.all([
                fetchAvailableClasses(),
                fetchOpenAirAvailableClasses(),
              ])
            }
          />
        </StyledContent>
      </StyledContainer>
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
    </>
  )
}
