/* eslint-disable no-lonely-if */
/* eslint-disable no-use-before-define */
/* eslint-disable no-else-return */
/* eslint-disable no-restricted-syntax */
import axios, { AxiosRequestConfig, Method } from 'axios'
import { getCookie } from 'cookies-next'
import Router from 'next/router'
import { METHODS } from 'src/api/methods'
import { API_BASE_URL_3 } from 'src/configs/env'
import { AccessAction } from 'src/hooks/usePermission'
import { generateRandomString, myDecrypt, responseError } from 'src/utils/generalUtils'
import { toggleErrorCatchAction, toggleErrorPermissionAction, toggleLoadingGlobal, toggleRefreshTokenAction } from 'src/generalReducer'
import { message } from 'antd'
import { refreshSSO } from 'src/utils/openid'
import { parseJwt } from 'src/utils/formatter'
import moment from 'moment'

const instance = axios.create()

interface CallOptions {
  method: Method
  subUrl?: string
  data?: Record<string, any>
  options?: AxiosRequestConfig
  overrideBaseUrl?: string
  showError?: boolean
}

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0
}

/**
 * Handle the response of a request asynchronously.
 *
 * @param {any} request - The request to handle.
 * @param {boolean} showError - A flag to indicate whether to show errors.
 * @return {Promise} The response of the request.
 */
const handleInstance = async (request, showError = true) => {
  try {
    const response = await request
    toggleLoadingGlobal(false)
    return response
  } catch (err) {
    toggleLoadingGlobal(false)
    const error = err?.response?.data
    const response = err?.response
    if (err?.response?.status === 403) {
      toggleErrorPermissionAction(false)
      handleAccessDenied()
      return { data: { data: { response } } }
    } else {
      if (err?.response?.status === 404) {
        return { response: { data: { data: { response } } } }
      } else if (err?.response?.status === 401) {
        const newToken = await refreshSSO()
        localStorage.setItem('token', newToken.access_token)
        localStorage.setItem('id_token', newToken.id_token)
        localStorage.setItem('refresh_token', newToken.refresh_token)
        toggleRefreshTokenAction(true)
        return { data: { data: { response } } }
      } else {
        handleOtherErrors(err, showError, error)
        return { response }
      }
    }
  }
}
/**
 * Handle access denied and perform necessary actions based on access permissions.
 */
const handleAccessDenied = () => {
  AccessAction({
    callback: (res) => {
      const hasAccess = res?.data?.[0]?.menus[0]?.permission.filter((access: any) => access.includes('View'))
      if (hasAccess === undefined) {
        toggleErrorPermissionAction(true)
      } else if (hasAccess.length === 0) {
        validateRoute()
      } else {
        toggleErrorPermissionAction(true)
      }
    },
  })
}
/**
 * Validates the current route and redirects to a 403 error page if the route matches certain pages.
 */
const validateRoute = () => {
  const protectedRoutes = ['/hc']
  if (protectedRoutes.some((route) => Router.pathname.includes(route))) {
    Router.push('/403')
  }
}
/**
 * Handles other errors based on the showError flag and error object.
 *
 * @param {any} err - the error object to be handled
 * @param {boolean} showError - flag to determine if the error should be shown
 * @param {any} error - the error object to be handled if showError is false
 */
const handleOtherErrors = (err, showError, error) => {
  if (showError) {
    responseError(err)
  } else {
    toggleErrorCatchAction(error?.data?.message || error?.message || error?.error)
  }
}
interface DotEnvConfig {
  [key: string]: string
}

/**
 * Handles the comparison of URL environment with config JSON,
 * with the option to override the base URL and return either an array or a specific URL.
 *
 * @param {string} overrideBaseUrl - the base URL to override
 * @param {boolean} isArray - flag to indicate whether to return an array
 * @return {Promise<any>} - the result of the URL comparison or the overridden base URL
 */
export const handleCompareUrlEnvWithConfigJson = async (overrideBaseUrl, isArray = false) => {
  if (overrideBaseUrl === undefined) {
    return API_BASE_URL_3
  }

  const fetchData = await fetch(`${window.location.origin}/hc/api/${generateRandomString()}`)
  const config = await fetchData.json()
  const dotConfig: DotEnvConfig = {}
  const dotEnv: DotEnvConfig = JSON.parse(myDecrypt(config.dotEnv, 5))

  JSON.parse(myDecrypt(config.dotConfig, 5)).forEach((valDotConfig) => {
    if (valDotConfig !== '' && !valDotConfig.includes('#')) {
      const [key, value] = valDotConfig.split('=')
      dotConfig[key.trim()] = value.trim()
    }
  })

  if (isArray) {
    return dotConfig
  } else {
    let newUrl: string | null = null
    const keyDotEnv = Object.keys(dotEnv)
    for (const key of keyDotEnv) {
      if (dotEnv[key] === overrideBaseUrl) {
        const keyDotConfig = Object.keys(dotConfig)
        for (const configKey of keyDotConfig) {
          if (configKey === key) {
            newUrl = dotConfig[configKey]
            break
          }
        }
        break
      }
    }
    return newUrl
  }
}

export async function call({
  method,
  subUrl = '',
  data = {},
  options,
  overrideBaseUrl,
  showError = true,
}: CallOptions) {
  message.destroy()
  toggleErrorPermissionAction(false)
  toggleLoadingGlobal(true)
  toggleRefreshTokenAction(false)

  const menuId = localStorage.getItem('companyCode')
  const screenCode = localStorage.getItem('screenCode')
  const rolename = localStorage.getItem('role')
  const username = localStorage.getItem('username')
  const companyname = localStorage.getItem('companyName')
  const payload = { ...data }
  const baseHeaders = {
    'x-company-id': menuId,
    'x-user-name': username || 'Maman Racing',
    'x-role-name': rolename || 'Super Admin',
    'x-screen-code': screenCode,
    'x-company-name': companyname,
  }

  const token = localStorage.getItem('token')

  const config: AxiosRequestConfig = {
    ...options,
    baseURL: overrideBaseUrl,
    method,
    url: subUrl,
    headers: {
      ...baseHeaders,
      ...(options && options.headers ? options.headers : {}),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token_code') || token}`,
    },
    data,
  }

  if (method === METHODS.GET) {
    if (!isObjectEmpty(payload)) {
      Object.keys(payload).forEach((key) => {
        if (payload[key] === null || payload[key] === '') {
          delete payload[key]
        }
      })
      config.params = payload
    }
  } else if (!isObjectEmpty(payload)) {
    config.data = payload
  }
  const newInstance = handleInstance(instance.request(config), showError)
  return newInstance
}
