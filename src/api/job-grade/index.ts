/* eslint-disable no-unsafe-optional-chaining */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlPMA = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListJobGrade = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/job-grade',
    data: {
      ...params,
      sort_by: 'created_at',
      sort_order: 'DESC',
    },
  })

  // for add no in columns
  const pagination = response?.data?.pagination
  if (response?.data?.data) {
    response?.data?.data.forEach((_el: any, idx: string) => {
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

export const createJobGrade = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/master/job-grade',
    overrideBaseUrl: overrideBaseUrlPMA,
    data: {
      id: parseInt(payload?.id, 10) ?? null,
      name: payload?.name ?? '',
      code: payload?.grade ?? '',
    },
  })
  return response
}

export const updateJobGrade = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: `/v2/master/job-grade/${payload?.id}`,
    data: {
      name: payload?.name ?? '',
      code: payload?.grade ?? '',
      is_active: payload?.is_active ?? '',
    },
  })
  return response
}

export const changeStatusJobGrade = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: `/v2/master/job-grade/change-status/${payload?.id}`,
  })
  return response
}

export const deleteJobGrade = async (payload: any) => {
  // const response = await call({
  //   method: METHODS.DELETE,
  //   overrideBaseUrl: overrideBaseUrlPMA,
  //   subUrl: `/v2/master/job-grade/delete/${payload?.id}`,
  // })
  // return response.data
}

export const downloadData = async (): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/job-grade/download',
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
    subUrl: '/v2/master/job-grade/download',
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
    subUrl: '/v2/master/job-grade/upload',
    data: formData,
    options: { responseType: 'blob' },
  })
  return response
}