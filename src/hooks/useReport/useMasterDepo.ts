/* eslint-disable camelcase */
import { useQuery } from 'react-query';
import { getClient } from './changeClient';

const apiPath = 'v1/report-sales/param-detail';

const doFetchList = async ({ query = {} }) => {
  const client = getClient();
  const res = await client(`/${apiPath}`, {
    params: {
      company_code: localStorage.getItem('companyCode'),
      field_name: 'depo',
      ...query,
    },
  })

  return res.data || []
}

export const useQueryMasterDepo = ({ query = {}, onSuccess = () => { }, onError = () => { } }) =>
  useQuery([`${apiPath}/depo`, query], () => doFetchList({ query }), {
    onSuccess,
    onError,
  })

const doFetchListDepoSales = async ({ query = {} }) => {
  const client = getClient();
  const res = await client(`/v1/master-data/depo/lists`, {
    params: {
      company_code: localStorage.getItem('companyCode'),
      ...query,
    },
  })

  return res.data.datas || []
}

export const useQueryMasterDepoSales = ({ query = {}, onSuccess = () => { }, onError = () => { } }) =>
  useQuery([`/v1/master-data/depo/lists`, query], () => doFetchListDepoSales({ query }), {
    onSuccess,
    onError,
  })

export const doFetchListSalesaman = async ({ query = {}, callback = null }) => {
  const client = getClient();
  await client(`v1/master-data/salesman/lists`, {
    params: {
      company_code: localStorage.getItem('companyCode'),
      ...query,
    },
  })
    .then((res) => (callback !== null ? callback(res.data.datas) : res.data.datas))
    .catch((e) => (callback !== null ? callback(e, true) : e))

  // return res.data.datas || []
}

export const doFetchWorkday = async ({ query = {}, callback = null }) => {
  const client = getClient();
  await client('/v1/master-data/standar-workday', {
    params: {
      ...query,
    },
  })
    .then((res) => (callback !== null ? callback(res.data) : res.data))
    .catch((e) => (callback !== null ? callback(e, true) : e))
}

export const useQueryMasterSalesaman = ({ query = {}, onSuccess = () => { }, onError = () => { } }) =>
  useQuery([`v1/master-data/salesman/lists`, query], () => doFetchListSalesaman({ query }), {
    onSuccess,
    onError,
  })
