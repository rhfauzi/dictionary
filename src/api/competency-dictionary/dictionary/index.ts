import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlPMA = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListCompetency = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/competency',
    data: {
      ...params,
      sort_by: 'created_at',
      sort_order: 'DESC',
    },
  })
  return response?.data
}

export const changeStatusJobCode = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: `/v2/competency/change-status/${payload?.id}`,
    data: { is_active: payload?.is_active },
  })
  return response
}

export const deleteCompetency = async (payload: any) => {
  // const response = await call({
  //   method: METHODS.DELETE,
  //   overrideBaseUrl: overrideBaseUrlPMA,
  //   subUrl: '/v2/competency',
  //   data: payload,
  // })
  // return response.data
}