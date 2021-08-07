import axios from 'axios'
import { useState, useCallback, useEffect } from 'react'
import { api } from '../services/api'
import { HTTP_METHODS } from '../utils/constants'

type RequestMethod = keyof typeof HTTP_METHODS

type ResponseData = Promise<any>

type useHttpRequestPropsData = {
  isLoading: boolean
  error: string
  sendRequest: (
    url: string,
    method: RequestMethod,
    headers?: object,
    body?: object
  ) => Promise<ResponseData>
  clearError: () => void
}

const useHttpRequest = (): useHttpRequestPropsData => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const cancelToken = axios.CancelToken
  const source = cancelToken.source()

  const sendRequest = useCallback(
    async (
      url: string,
      method: RequestMethod = 'GET',
      headers?: object,
      body?: object
    ): Promise<ResponseData> => {
      setIsLoading(true)

      try {
        const { data: responseData } = await api({
          url: `${api.defaults.baseURL}${url}`,
          method,
          headers: { ...api.defaults.headers, ...headers },
          data: body,
          cancelToken: source.token,
        })

        return responseData
      } catch (error) {
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const clearError = () => setError('')

  useEffect(() => {
    return () => {
      source.cancel('axios request cancelled')
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}

export { useHttpRequest, RequestMethod }
