// import { Token, Grant } from 'svc-auth-sdk-node'
import { getConfig } from 'src/contexts/UserContext'
import { Grant } from 'sdk-web/src/account-center/index'

// export const config = {
//   env: process.env.NEXT_PUBLIC_API_BASE_AUTH_ENV,
//   client_id: process.env.NEXT_PUBLIC_API_BASE_AUTH_CLIENT_ID,
//   client_secret: process.env.NEXT_PUBLIC_API_BASE_AUTH_CLIENT_SECRET,
//   // scope: 'offline_access',
//   // resource: '',
//   redirect_uri: process.env.NEXT_PUBLIC_API_BASE_AUTH_CLIENT_REDIRECT_URI,
// }
const { Token } = require('sdk-web/src/account-center')

export const resolveSSO = async (token) => {
  const configUrl = await getConfig()
  if (token) {
    const res = await Token.resolve(token, configUrl.env)
    return !!res.profile
  }
  return false
}

export const refreshSSO = async () => {
  const configUrl = await getConfig()
  const authorizationCode = new Grant.AuthorizationCode.Browser(configUrl)
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) return false
  const newToken = await authorizationCode.refresh(refreshToken)
  return newToken.access_token ? newToken : false
}

export const logoutSSO = async () => {
  const configUrl = await getConfig()
  const token = localStorage.getItem('token')
  if (token) {
    await Token.destroy(token, configUrl.env)
  }

  const callback = configUrl.redirect_uri.replace('/callback', '/eds/login')
  window.location.assign(`${getHost(configUrl.env)}/logout?callback=${callback}`)
  localStorage.clear()
}

const getHost = (env) => {
  const host = {
    development: 'https://cronus-dev.edot.id',
    stagging: 'https://cronus-stg.edot.id',
    production: 'https://cronus.edot.id',
  }

  return host[env]
}

export default Token
export { Token }
