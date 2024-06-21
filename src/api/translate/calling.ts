import { call } from '../BaseApi'
import { METHODS } from '../methods'
import { TranslateProps } from './types'

export const confApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL_TRANSLATE
export const https = {
  uri: confApiUrl,
  get: async (url: string, params: TranslateProps) => {
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
}
