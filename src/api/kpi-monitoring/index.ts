/* eslint-disable no-unsafe-optional-chaining */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlHC = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListKPIMonitoring = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/kpi-monitoring',
    data: {
      ...params,
    },
  })
  return response?.data?.data
}
