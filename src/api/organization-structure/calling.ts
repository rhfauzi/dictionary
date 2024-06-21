import { call } from '../BaseApi'
import { METHODS } from '../methods'

export const confApiUrl = process.env.NEXT_PUBLIC_API_BASE_DEV
export const https = {
  uri: confApiUrl,
  get: async (url: string, params?: any) => {
    try {
      const req = await call({
        method: METHODS.GET,
        subUrl: url,
        overrideBaseUrl: confApiUrl,
        data: params,
      })
      return req.data
    } catch (error) {
      throw error
    }
  },
  post: async (url: string, data: any) => {
    try {
      const req = await call({
        method: METHODS.POST,
        subUrl: url,
        overrideBaseUrl: confApiUrl,
        data,
      })
      return req.data
    } catch (error) {
      throw error
    }
  },
  put: async (url: string, data: any) => {
    try {
      const req = await call({
        method: METHODS.PUT,
        subUrl: url,
        overrideBaseUrl: confApiUrl,
        data,
      })
    } catch (error) {
      throw error
    }
  },
  patch: async (url: string, data: any) => {
    try {
      const req = await call({
        method: METHODS.PATCH,
        subUrl: url,
        overrideBaseUrl: confApiUrl,
        data,
      })
    } catch (error) {
      throw error
    }
  },
  delete: async (url: string, data: any) => {
    try {
      const req = await call({
        method: METHODS.DELETE,
        subUrl: url,
        overrideBaseUrl: confApiUrl,
        data,
      })
      return req.data
    } catch (error) {
      throw error
    }
  },
  upload: async (url: string, file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const req = await call({
        method: METHODS.POST,
        overrideBaseUrl: confApiUrl,
        subUrl: url,
        data: formData,
        options: {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      })
      return req.data
    } catch (error) {
      throw error
    }
  },
  downloadData: async () => {
    try {
      const res = await call({
        method: METHODS.GET,
        overrideBaseUrl: confApiUrl,
        subUrl: '/v1/download/profit',
      })
      return res
    } catch (error) {
      throw error
    }
  },
}
