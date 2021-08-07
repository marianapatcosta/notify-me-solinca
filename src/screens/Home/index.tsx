import React, { useCallback, useState, useEffect } from 'react'
import { Dimensions, RefreshControl } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import * as Notifications from 'expo-notifications'
import {
  ClassInfoItem,
  ClassTypeButton,
  Loading,
  Modal,
  ModalView,
  Profile,
} from '../../components'
import { ClassInfo } from '../../components/ClassInfoItem'
import Indoors from '../../assets/svg/indoors.svg'
import OpenAir from '../../assets/svg/open-air.svg'
import { useAuth } from '../../hooks/auth'
import { useLocale } from '../../hooks/useLocale'
import { useHttpRequest, RequestMethod } from '../../hooks/useHttpRequest'
import { HTTP_METHODS } from '../../utils/constants'
import {
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledNoData,
  StyledSectionTitle,
  StyledSection,
  StyledClassesTypes,
} from './styles'
import { useNotifications } from '../../hooks/notifications'

enum CLASS_TYPES {
  INDOORS = 'indoors',
  OPEN_AIR = 'open air',
}

type ClassType = `${CLASS_TYPES}`

type ClassesData = {
  title: string
  data: ClassInfo[]
}

export const Home = () => {
  const { user } = useAuth()
  const { t } = useLocale()
  const theme = useTheme()
  const navigation = useNavigation()
  const { handleNewNotification } = useNotifications()
  const { highlight50, highlight90, title } = theme.colors
  const { sendRequest, error, clearError, isLoading } = useHttpRequest()
  const [availableClasses, setAvailableClasses] = useState<ClassesData[]>([])
  const [availableOpenAirClasses, setOpenAirAvailableClasses] = useState<
    ClassesData[]
  >([])
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedClassType, setSelectedClassType] = useState<ClassType>(
    CLASS_TYPES.INDOORS
  )
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  const handleSelectIndoorClasses = () =>
    setSelectedClassType(CLASS_TYPES.INDOORS)

  const handleSelectOpenAirClasses = () =>
    setSelectedClassType(CLASS_TYPES.OPEN_AIR)

  const areThereClassesAvailable = (classes: ClassInfo[]) =>
    !classes.every(({ today, tomorrow }) => !today.length && !tomorrow.length)

  const fetchAvailableClasses = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        '/club/classes',
        HTTP_METHODS.GET as RequestMethod,
        {}
      )
      setAvailableClasses([
        {
          title: t('home.favoriteClasses'),
          data: responseData.matchedClasses,
        },
        {
          title: t('home.otherClasses'),
          data: responseData.otherClasses,
        },
      ])
    } catch (error) {
      setErrorMessage(t('home.classesError'))
    }
  }, [sendRequest])

  const fetchOpenAirAvailableClasses = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        '/club/open-air-classes',
        HTTP_METHODS.GET as RequestMethod,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      setOpenAirAvailableClasses([
        {
          title: t('home.favoriteClasses'),
          data: responseData.matchedClasses,
        },
        {
          title: t('home.otherClasses'),
          data: responseData.otherClasses,
        },
      ])
    } catch (error) {
      setErrorMessage(t('home.classesError'))
    }
  }, [sendRequest])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([fetchAvailableClasses(), fetchOpenAirAvailableClasses()])
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchAvailableClasses()
      fetchOpenAirAvailableClasses()
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

  const renderNoData = ({ section }: { section: ClassesData }) => {
    if (!areThereClassesAvailable(section.data)) {
      return <StyledNoData>{t('home.noClassesAvailable')}</StyledNoData>
    }
  }

  const renderContent = () => {
    const commonSectionListProps = {
      renderItem: ({ item }) => (
        <ClassInfoItem classInfo={item} style={{ paddingBottom: 100 }} />
      ),
      showsVerticalScrollIndicator: false,
      renderSectionFooter: renderNoData,
      renderSectionHeader: ({ section: { title } }) => (
        <StyledSectionTitle>{title}</StyledSectionTitle>
      ),
      refreshControl: (
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={[highlight50]}
          progressBackgroundColor={title}
          tintColor={highlight50}
        />
      ),
    }

    if (isLoading) {
      return <Loading />
    }

    if (selectedClassType === CLASS_TYPES.INDOORS) {
      return (
        <StyledSection
          sections={availableClasses}
          keyExtractor={(item) => `available-classes-${item.club}`}
          {...commonSectionListProps}
        />
      )
    }

    if (selectedClassType === CLASS_TYPES.OPEN_AIR) {
      return (
        <StyledSection
          sections={availableOpenAirClasses}
          keyExtractor={(item) => `available-open-air-classes-${item.club}`}
          {...commonSectionListProps}
        />
      )
    }
  }

  return (
    <>
      <StyledContainer accessible={true}>
        <StyledHeader colors={[highlight90, highlight50]}>
          <Profile />
        </StyledHeader>
        <StyledContent>
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
          {renderContent()}
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
