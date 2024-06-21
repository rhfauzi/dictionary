import { call } from 'src/api/BaseApi'
import { METHODS } from 'src/api/methods'

const overrideBaseUrlPMA = process.env.NEXT_PUBLIC_API_BASE_DEV

const param = {
  limit: 20,
  page: 1,
  sort_by: 'created_at',
  sort_order: 'ASC',
}

export const getCountry = async (search: string): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/country',
    data: {
      search,
      ...param,
    },
  })

  return response?.data?.data?.map(({ code, name }) => ({
    label: name,
    value: code,
    id: code,
    key: code,
  }))
}

export const getLegalEntity = async (search: string): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/legal-entity',
    data: {
      search,
      ...param,
    },
  })

  return response?.data?.data?.map(({ id, name, code }) => ({
    label: name,
    value: code,
    id,
    key: code,
  }))
}

export const getJobFamily = async (search: string): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/job-family',
    data: {
      search,
      ...param,
    },
  })

  return response?.data?.data?.map(({ id, name, code }) => ({
    label: name,
    value: code,
    id,
    key: code,
  }))
}

export const getSubJobFamily = async (payload: any): Promise<any> => {
  console.log('payload 9999999999999', payload)
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/sub-job-family',
    data: {
      ...payload,
      ...param,
    },
  })

  return response?.data?.data?.map(({ id, name, code }) => ({
    label: name,
    value: code,
    id,
    key: code,
  }))
}

export const getJobTitle = async (search: string): Promise<any> => {
  const response = await call({
    method: METHODS.GET,
    overrideBaseUrl: overrideBaseUrlPMA,
    subUrl: '/v2/master/job-title',
    data: {
      search,
      ...param,
    },
  })

  return response?.data?.data?.map(({ code, name }) => ({
    label: name,
    value: code,
    id: code,
    key: code,
  }))
}

export const createCompetency = async (payload: any) => {
  const response = await call({
    method: METHODS.POST,
    subUrl: '/v2/competency',
    overrideBaseUrl: overrideBaseUrlPMA,
    data: payload,
  })
  return response
}

export const getDetailCompetency = async (id_competency: any) => {
  const response = await call({
    method: METHODS.GET,
    subUrl: `/v2/competency/${id_competency}`,
    overrideBaseUrl: overrideBaseUrlPMA,
  })
  return response
}

export const updateCompetency = async (payload: any, id_competency: number) => {
  const response = await call({
    method: METHODS.PUT,
    subUrl: `/v2/competency/${id_competency}`,
    overrideBaseUrl: overrideBaseUrlPMA,
    data: payload,
  })
  return response
}