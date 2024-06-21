/* eslint-disable no-unsafe-optional-chaining */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlHC = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListKPIResult = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/kpi-result',
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

export const getListKPIResultById = async (payload: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/kpi-result/${payload?.kpi_setting_id}`,
  })
  return response
}

export const createKPIResult = async (payload: any) => {
  console.log('createKPIResult payload', payload)
  console.log('createKPIResult DATE', payload?.date?.format('YYYY-MM-DD'))
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/kpi-result',
    overrideBaseUrl: overrideBaseUrlHC,
    data: {
      value: payload?.value ?? 0,
      date: payload?.date.format('YYYY-MM-DD') ?? '',
      kpi_monthly_target_id: payload?.kpi_monthly_target_id ?? 0,
      file_url: payload?.file_url ?? '',
    },
  })
  console.log('createKPIResult', response)
  return response
}

export const updateKPIResult = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/kpi-result/${payload?.kpi_result_id}`,
    data: {
      date: payload?.date.format('YYYY-MM-DD') ?? '',
      file_url: payload?.file_url ?? 0,
      value: payload?.value ?? '',
    },
  })
  console.log('updateKPIResult', response)
  return response
}

export const deleteKPIResult = async (payload: any) => {
  const response = await call({
    method: METHODS.DELETE,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/kpi-result/${payload?.kpi_result_id}`,
  })
  console.log('response', response)
  return response
}

export const downloadData = async (): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/master/job-code/download',
    data: {
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
    subUrl: '/v2/kpi-result/upload',
    data: formData,
    options: {
      // responseType: 'blob',
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    },
  })
  return response
}
