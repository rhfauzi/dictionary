import { AxiosError, AxiosResponse } from 'axios'

export const responseInterceptor = (response: AxiosResponse) => ({
  ...response,
})

export const errorInterceptor = (err: AxiosError): Promise<never> => {
  const { response } = err
  return Promise.reject(err)
}
