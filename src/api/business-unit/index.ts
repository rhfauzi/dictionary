/* eslint-disable max-len */
/* eslint-disable no-unsafe-optional-chaining */
import { call } from 'src/api/BaseApi'
import { baseFetch } from 'src/api/BaseFetch'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlPMA = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListBusinessUnit = async (params: any) => {
  try {
    const response = await baseFetch('GET', 'http://localhost:8001/api/v2/master/business-unit', { params })

    const pagination = response?.data?.pagination
    if (response?.data?.data) {
      response?.data?.data.forEach((_el, idx) => {
        const no = (pagination?.current_page * pagination?.limit_per_page) - pagination?.limit_per_page + idx + 1
        if (pagination?.current_page > 1) {
          response.data.data[idx].no = Number(no)
        } else {
          response.data.data[idx].no = Number(idx + 1)
        }
      })
    }

    return response?.data
  } catch (error) {
    console.error('Error fetching business units:', error)
    throw error; // Re-throw the error to be handled by the caller
  }
}

export const createBusinessUnit = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/master/business-unit',
    overrideBaseUrl: overrideBaseUrlPMA,
    data: {
      name: payload?.name ?? '',
      code: payload?.code ?? '',
    },
  })
  return response
}

export const updateBusinessUnit = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: `/v2/master/business-unit/${payload?.code}`,
    data: {
      name: payload?.name ?? '',
      is_active: payload?.is_active ?? '',
    },
  })
  return response
}

export const changeStatusBusinessUnit = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: `/v2/master/business-unit/change-status/${payload?.code}`,
  })
  return response
}

export const deleteBusinessUnit = async (payload: any) => {
  // const response = await call({
  //   method: METHODS.DELETE,
  //   overrideBaseUrl: overrideBaseUrlPMA,
  //   subUrl: `/v2/master/business-unit/delete/${payload?.code}`,
  // })
  // return response.data
}

export const downloadData = async (): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/business-unit/download',
    data: {
      file_type: 'xlsx',
      with_data: true,
    },
    options: { responseType: 'blob' },
  })
  return response?.data
}

export const downloadTemplate = async (): Promise<any> => {
  // const response = await call({
  //   method: METHODS.GET,
  //   overrideBaseUrl: overrideBaseUrlPMA,
  //   subUrl: '/v2/master/business-unit/download',
  //   data: {
  //     file_type: 'xlsx',
  //     with_data: false,
  //   },
  //   options: { responseType: 'blob' },
  // })
  // return response.data

  try {
    const response = await baseFetch('GET', 'http://localhost:8001/api/v2/master/business-unit/download', {})
    return response
  } catch (error) {
    console.error('Error fetching business units:', error)
    throw error; // Re-throw the error to be handled by the caller
  }
}

export const uploadTemplate = async (payload: any) => {
  const formData = new FormData();
  formData.append('file', payload?.originFileObj)
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/business-unit/upload',
    data: formData,
    options: { responseType: 'blob' },
  })
  return response
}