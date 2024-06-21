/* eslint-disable no-unsafe-optional-chaining */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlPMA = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListCountry = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/country',
    data: {
      ...params,
      sort_by: 'created_at',
      sort_order: 'DESC',
    },
  })

  // for add no in columns
  const pagination = response?.data?.pagination
  if (response?.data?.data) {
    response?.data?.data.forEach((_: any, idx: string) => {
      // eslint-disable-next-line max-len
      const no = (pagination?.current_page * pagination?.limit_per_page) - pagination?.limit_per_page + idx + 1
      if (pagination?.current_page > 1) {
        response.data.data[idx].no = Number(no)
      } else {
        response.data.data[idx].no = Number(idx + 1)
      }
    })
  }
  return response?.data
}

export const createCountry = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/master/country',
    overrideBaseUrl: overrideBaseUrlPMA,
    data: {
      name: payload?.name ?? '',
      code: payload?.code ?? '',
    },
  })
  return response
}

export const updateCountry = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: `/v2/master/country/${payload?.id}`,
    data: {
      name: payload?.name ?? '',
      is_active: payload?.is_active ?? '',
    },
  })
  return response
}

export const deleteCountry = async (payload: any) => {
  // const response = await call({
  //   method: METHODS.DELETE,
  //   overrideBaseUrl: overrideBaseUrlPMA,
  //   subUrl: `/v2/master/country/delete/${payload?.code}`,
  // })
  // return response.data
}

export const downloadData = async (): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/country/download',
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
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/country/download',
    data: {
      file_type: 'xlsx',
      with_data: false,
    },
    options: { responseType: 'blob' },
  })
  return response.data
}

export const uploadTemplate = async (payload: any) => {
  const formData = new FormData();
  formData.append('file', payload?.originFileObj)
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/country/upload',
    data: formData,
    options: { responseType: 'blob' },
  })
  return response
}