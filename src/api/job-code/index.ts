/* eslint-disable no-unsafe-optional-chaining */
import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlHC = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListJobCode = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlHC,
    subUrl: '/v2/master/job-code',
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

export const createJobCode = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/master/job-code',
    overrideBaseUrl: overrideBaseUrlHC,
    data: {
      country_code: payload?.country_code ?? '',
      is_active: payload?.is_active ?? '',
      job_family_code: payload?.job_family_code ?? '',
      job_grade_id: payload?.job_grade_id ?? 0,
      job_title_id: payload?.job_title_id ?? 0,
      legal_entity_code: payload?.legal_entity_code ?? '',
      sub_job_family_code: payload?.sub_job_family_code ?? '',
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

export const deleteJobCode = async (payload: any) => {
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
    subUrl: '/v2/master/job-code/upload',
    data: formData,
    options: { responseType: 'blob' },
  })
  return response
}
