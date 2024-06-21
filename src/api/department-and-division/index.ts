import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlPMA = process.env.NEXT_PUBLIC_API_BASE_DEV

export const getListDepartmentAndDivision = async (params: any): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/division-and-department',
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
      const no = (pagination.current_page * pagination.limit_per_page) - pagination.limit_per_page + idx + 1
      if (pagination.current_page > 1) {
        response.data.data[idx].no = Number(no)
      } else {
        response.data.data[idx].no = Number(idx + 1)
      }
    })
  }

  return response?.data
}

export const createDepartmentAndDivision = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/master/division-and-department',
    overrideBaseUrl: overrideBaseUrlPMA,
    data: {
      is_active: payload?.is_active ?? '',
      division_name: payload?.division_name ?? '',
      department_name: payload?.department_name ?? '',
    },
  })
  return response
}

export const changeStatusDepartmentAndDivision = async (payload: any) => {
  const response = await call({
    method: METHODS.PUT,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: `/v2/master/division-and-department/change-status/${payload?.department_id}`,
  })
  return response
}

export const deleteDepartmentAndDivision = async (payload: any) => {
  const response = await call({
    method: METHODS.DELETE,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: `/v2/master/division-and-department/delete/${payload?.department_id}`,
  })
  return response.data
}

export const downloadData = async (): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/division-and-department/download',
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
    subUrl: '/v2/master/division-and-department/download',
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
  formData.append('file', payload?.originFileObj);
  const response = await call({
    method: METHODS.POST,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/division-and-department/upload',
    data: formData,
    options: { responseType: 'blob' },
  })
  return response
}