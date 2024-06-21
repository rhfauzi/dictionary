import { message } from 'antd'
import moment from 'moment'
import { MOVEMENT_TYPE_OPTIONS, STATUS_OPTIONS } from './constant'

export const responseError = (res) => {
  const err = res?.response?.data
  if (res?.response?.status !== 403) {
     message.error(
      `${
        err?.data?.message ||
        err?.message ||
        err?.error ||
        res?.response?.statusText ||
        'Something went wrong'
      } . Status code [${err?.code || res?.response?.status || ''}]`,
    )
  }
}

// export const toSlocDefault = 'GS00'
// export const fromSlocDefault = 'GS00'
// export const docTypeDefault = 'ZDST';
// export const orderTypeDefault = 'ZOP1';

// export const receiveBranchIdDefault = 'P104';
// export const supplyBranchIdDefault = 'P105';

// export const matDocTypeDefault = 'WA';

// eslint-disable-next-line max-len
export const rmDuplicateArray = (arr, key) =>
  [...new Map(arr.map((item) => [item[key], item])).values()] as any

export const goBack = () => {
  window.history.go(-1)
  return false
}

export const disabledBackDate = (current) => moment().add(-1, 'days') >= current

export const disabledDatethirtyDaysAgo = (current) =>
  current &&
  (current < moment().subtract(32, 'days').endOf('day') ||
    current > moment().subtract(1, 'days').endOf('day'))

export const getMoveTypeOptions = (router) => {
  const extractUrl = router.pathname.split('/')
  const newItem = []
  MOVEMENT_TYPE_OPTIONS.filter((item) => {
    item.menu.filter((menu) => {
      if (menu === extractUrl[extractUrl.length - 1]) {
        newItem.push(item)
      }
    })
  })
  return newItem
}

export const getStatusOptions = (router) => {
  const extractUrl = router.pathname.split('/')
  const newItem = []
  STATUS_OPTIONS.filter((item) => {
    item.menu.filter((menu) => {
      if (menu === extractUrl[extractUrl.length - 1]) {
        newItem.push(item)
      }
    })
  })
  return newItem
}

export const reloadPageWithBody = (table) => {
  table.handler.handleSelected([])
  table.handler.handlePagination(table.state.page, table.state.limit)
}

export const removeSpecialCharsAndTitleCase = (input: string) => {
  if (input) {
    const withoutSpecialChars = input.replace(/[^\w\s]/g, ' ')
    const words = withoutSpecialChars.split(' ')
    const titleCasedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    return titleCasedWords.join(' ')
  }
}

export const generateRandomString = (digit = 36) =>
  Math.random().toString(digit).substring(2) + new Date().getTime().toString(digit)

export const myEncrypt = (text, shift) => {
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-zA-Z]/)) {
        const code = char.charCodeAt(0)
        const isUpperCase = char === char.toUpperCase()
        const offset = isUpperCase ? 65 : 97
        return String.fromCharCode(((code - offset + shift) % 26) + offset)
      }
      return char
    })
    .join('')
}
export const myDecrypt = (text, shift) => {
  return myEncrypt(text, 26 - shift)
}
