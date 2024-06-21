import { snakeCase, camelCase } from 'lodash'

export function toCamelCase<T>(obj: any): T {
  if (typeof obj !== 'object' || typeof obj === 'undefined' || obj === null || obj === '') {
    return obj
  }
  if (Array.isArray(obj)) {
    const arr = obj as Array<any>
    return arr.map((item: any) => toCamelCase(item)) as any
  }
  const newObj: any = {}
  Object.keys(obj).forEach((key) => {
    const newKey = camelCase(key)
    const newVal = toCamelCase(obj[key])
    newObj[newKey] = newVal
  })
  return newObj
}

export function toSnakeCase<T>(obj: any): T {
  if (typeof obj !== 'object' || typeof obj === 'undefined' || obj === null || obj === '') {
    return obj
  }
  if (Array.isArray(obj)) {
    const arr = obj as Array<any>
    return arr.map((item: any) => toSnakeCase(item)) as any
  }
  const newObj: any = {}
  Object.keys(obj).forEach((key) => {
    const newKey = snakeCase(key)
    const newVal = obj[key] ? toSnakeCase(obj[key]) : obj[key]
    newObj[newKey] = newVal
  })
  return newObj
}

export function parseJwt<T>(token: any): T {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

  return JSON.parse(jsonPayload);
}
