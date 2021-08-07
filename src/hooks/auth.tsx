import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Alert } from 'react-native'
import { COLLECTION_USER_AUTH, HTTP_METHODS } from '../utils/constants'
import { api } from '../services/api'
import { useAsyncStorage } from './useAsyncStorage'
import { useHttpRequest, RequestMethod } from './useHttpRequest'
import { useLocale } from './useLocale'

export type User = {
  userId: string
  username: string
  email: string
  token: string
}

type AuthContextData = {
  user: User
  error: string
  isLoading: boolean
  onAuthenticationSuccess: (userData: User) => void
  clearError: () => void
  signIn: (signInData: SignInData) => User
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

type SignInData = {
  username: string
  password: string
}

const AuthContext = createContext({} as AuthContextData)

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User)
  const { isLoading, error, sendRequest, clearError } = useHttpRequest()
  const { t } = useLocale()
  const { getStoredItem, saveItemInStorage, removeStoredItem } =
    useAsyncStorage()

  const signIn = async (signInData: SignInData): User => {
    const responseData = await sendRequest(
      '/user/signin',
      HTTP_METHODS.POST as RequestMethod,
      {},
      signInData
    )
    return responseData
  }

  const signOut = async () => {
    try {
      // to not receive notifications when user is logged out
      await sendRequest(
        `/user/${user.userId}`,
        HTTP_METHODS.PATCH as RequestMethod,
        {},
        { expoPushToken: null }
      )
      setUser({} as User)
      await removeStoredItem(COLLECTION_USER_AUTH)
    } catch (error) {
      throw new Error(error)
    }
  }

  const onAuthenticationSuccess = (userData: User) => {
    api.defaults.headers.authorization = `Bearer ${userData.token}`
    saveItemInStorage(COLLECTION_USER_AUTH, userData)
    setUser(userData)
  }

  const loadUserStorageData = async () => {
    try {
      const userStorage: User | undefined = await getStoredItem(
        COLLECTION_USER_AUTH
      )
      if (!!userStorage) {
        api.defaults.headers.authorization = `Bearer ${userStorage.token}`
        setUser(userStorage)
      }
    } catch (error) {
      Alert.alert(t('global.anErrorOccurred'), t('authentication.loginError'))
    }
  }

  useEffect(() => {
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        onAuthenticationSuccess,
        clearError,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const authContext = useContext(AuthContext)
  return authContext
}

export { AuthContextProvider, useAuth }
