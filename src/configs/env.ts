// import { getFetchUrl } from "src/api/BaseApi"

// import { myDecrypt } from 'src/utils/generalUtils'

export const PUBLIC_URL = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : ''
export const API_DIST_SYSTEM_URL = 'https://dist-system.nabatisnack.co.id:3001/'

export const IS_PRODUCTION = process.env.REACT_APP_ENVIRONMENT === 'production'
export const MAINTENANCE = false

let urlLogistic = process.env.NEXT_PUBLIC_API_BASE_URL_2
let urlSales = process.env.NEXT_PUBLIC_API_BASE_URL_3
let urlExtract = process.env.NEXT_PUBLIC_API_BASE_URL_EXTRACT
let urlMarketing = process.env.NEXT_PUBLIC_API_BASE_URL_MARKETING
let urlSalesGateway = process.env.NEXT_PUBLIC_API_BASE_URL_SALES
let urlSSOPermission = process.env.NEXT_PUBLIC_MENU_URL_DEV_SSO
let urlSfaTo = process.env.NEXT_PUBLIC_API_BASE_URL_4

export const API_BASE_URL_1 = urlSales
export let API_BASE_URL_2 = urlLogistic
export let API_BASE_URL_3 = urlSales
export let API_BASE_URL_4 = urlSalesGateway
export let API_BASE_URL_5 = urlMarketing
export let API_BASE_SSO = urlSSOPermission
export let API_BASE_URL_EXTRACT = urlExtract
export let API_BASE_URL_SFA_TO = urlSfaTo
