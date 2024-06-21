import { call } from "src/api/BaseApi"
import { METHODS } from "src/api/methods"

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
}
