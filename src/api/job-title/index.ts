import { call } from '../BaseApi'
import { METHODS } from '../methods'

const overrideBaseUrlHC = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListJobTitle = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/master/job-title',
    data: {
      ...params,
      sort_by: 'created_at',
      sort_order: 'ASC',
    },
  })

  // for add no in columns
  const pagination = response?.data?.pagination
  if (response?.data?.data) {
    response?.data?.data.forEach((_el: any, idx: string) => {
      // eslint-disable-next-line max-len
      const no = pagination.current_page * pagination.limit_per_page - pagination.limit_per_page + idx + 1
      if (pagination?.current_page > 1) {
        response.data.data[idx].no = Number(no)
      } else {
        response.data.data[idx].no = Number(idx + 1)
      }
    })
  }
  return response?.data
}

export const createJobTitle = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/master/job-title',
    overrideBaseUrl: overrideBaseUrlHC,
    data: {
      name: payload?.name ?? '',
      is_active: payload?.is_active ?? '',
    },
  })
  return response
}

export const updateJobTitle = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/master/job-title/${payload?.code}`,
    data: {
      name: payload?.name ?? '',
      is_active: payload?.is_active ?? '',
    },
  })
  return response
}

export const changeStatusJobTitle = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/master/job-title/change-status/${payload?.code}`,
  })
  return response
}

export const deleteJobTitle = async (payload: any) => {
  const response = await call({
    method: METHODS.DELETE,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: `/v2/master/job-title/delete/${payload?.code}`,
  })
  return response.data
}

export const downloadData = async (): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/master/job-title/download',
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
    subUrl: '/v2/master/job-title/download',
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
    subUrl: '/v2/master/job-title/upload',
    data: formData,
    options: { responseType: 'blob' },
  })
  return response
}
