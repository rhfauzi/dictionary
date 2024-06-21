/* eslint-disable no-unsafe-optional-chaining */
import moment from 'moment'
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlHC = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListMasterKPI = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/master/kpi',
    data: {
      ...params,
      sort_by: '',
      sort_order: '',
    },
  })

  // for add no in columns
  const pagination = response?.data?.pagination
  if (response?.data?.data) {
    response?.data?.data.forEach((_el: any, idx: string) => {
      // eslint-disable-next-line max-len
      const no =
        pagination?.current_page * pagination?.limit_per_page - pagination?.limit_per_page + idx + 1
      if (pagination?.current_page > 1) {
        response.data.data[idx].no = no.toString()
      } else {
        response.data.data[idx].no = (idx + 1).toString()
      }
    })
  }
  return response?.data
}

export const createMasterKPI = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/master/kpi',
    overrideBaseUrl: overrideBaseUrlHC,
    data: {
      description: payload?.description ?? '',
      kpi_category: payload?.kpi_category ?? '',
      kpi_condition: payload?.kpi_condition ?? '',
      name: payload?.name ?? '',
      value_type: payload?.value_type ?? '',
      year: moment().year(),
    },
  })
  return response
}

export const updateMasterKPI = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/master/kpi/${payload?.id}`,
    data: {
      description: payload?.description ?? '',
      kpi_category: payload?.kpi_category ?? '',
      kpi_condition: payload?.kpi_condition ?? '',
      name: payload?.name ?? '',
      value_type: payload?.value_type ?? '',
      year: moment().year(),
    },
  })
  return response
}

export const changeStatusJobCode = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/master/job-code/change-status/${payload?.id}`,
    data: {
      is_active: payload?.is_active,
    },
  })
  return response
}

export const deleteMasterKPI = async (payload: any) => {
  const response = await call({
    method: METHODS.DELETE,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/master/job-code/delete/${payload?.code}`,
  })
  return response.data
}

export const downloadData = async (): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/master/kpi/download',
    data: {
      year: 0,
      file_type: 'xlsx',
      with_data: true,
    },
    options: { responseType: 'blob' },
  })
  return response?.data
}

export const downloadTemplate = async (): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/master/job-code/download',
    data: {
      file_type: 'xlsx',
      with_data: false,
    },
    options: { responseType: 'blob' },
  })
  return response.data
}

export const uploadTemplate = async (payload: any) => {
  const formData = new FormData()
  formData.append('file', payload?.originFileObj)
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/master/job-code/upload',
    data: formData,
    options: { responseType: 'blob' },
  })
  return response
}
