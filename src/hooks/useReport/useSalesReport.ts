/* eslint-disable camelcase */
import { useQuery } from 'react-query'
import { getClient } from './changeClient';

const apiPath = 'v1/report-sales'

export function useSalesReport() {
  const client  = getClient();
  const doFetchDownloadListOutletAchievement = async ({ query, callback = null }) =>
    client(`/${apiPath}/outlet-achievement/download`, {
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      },
      params: {
        limit: 1000,
        page: 1,
        file_type: 'xlsx',
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    })
      .then((res) => (callback !== null ? callback(res) : res))
      .catch((e) => (callback !== null ? callback(e, true) : e))

  const doFetchDownloadListTopSalesman = async ({ query, callback = null }) =>
    client(`/${apiPath}/salesman/download`, {
      params: {
        limit: query.limit,
        page: query.page,
        file_type: 'xlsx',
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    })
      .then((res) => (callback !== null ? callback(res) : res))
      .catch((e) => (callback !== null ? callback(e, true) : e))
  const getListDownloadListTopSalesman = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery(
      [`${apiPath}/salesman/download`, query],
      () => doFetchDownloadListTopSalesman({ query }),
      {
        keepPreviousData: true,
        onSuccess,
        onError,
        enabled,
      },
    )

  const doFetchAllListSalesman = async ({ query }) => {
    return client(`/${apiPath}/salesman/lists`, {
      params: {
        limit: query.limit,
        page: query.page,
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    }).then((res) => {
      res.data.datas.map((v, i) => {
        const lm = v.last_month
        const ltm = v.last_three_month

        Object.assign(v, {
          key: i,
          children: [
            {
              key: Math.floor(Math.random() * 99999999999) + 1,
              periode: '',
              depo: '',
              salesman: 'Last Month',
              currency_id: lm.currency_id,

              qty_tgt: lm.qty_tgt,
              qty_real: lm.qty_real,
              qty_percentage: lm.qty_percentage,
              value_tgt: lm.value_tgt,
              value_real: lm.value_real,
              value_percentage: lm.value_percentage,
              performance_cb: lm.performance_cb,
              performance_roa: lm.performance_roa,
              performance_percentage_roa: lm.performance_percentage_roa,
              performance_sc: lm.performance_sc,
              performance_ec: lm.performance_ec,
              performance_percentage_ec: lm.performance_percentage_ec,
              // tgt_ipt: lm.tgt_ipt,
              // performance_percentage_ipt: lm.tgt_ipt,

              performance_ipt: lm.performance_ipt,
              tgt_ipt: lm.tgt_ipt,
              performance_percentage_ipt: lm.performance_percentage_ipt,
            },
            {
              key: Math.floor(Math.random() * 99999999999) + 1,
              periode: '',
              depo: '',
              salesman: 'Avg. Last 3 Month',
              currency_id: ltm.currency_id,

              qty_tgt: ltm.qty_tgt,
              qty_real: ltm.qty_real,
              qty_percentage: ltm.qty_percentage,
              value_tgt: ltm.value_tgt,
              value_real: ltm.value_real,
              value_percentage: ltm.value_percentage,
              performance_cb: ltm.performance_cb,
              performance_roa: ltm.performance_roa,
              performance_percentage_roa: ltm.performance_percentage_roa,
              performance_sc: ltm.performance_sc,
              performance_ec: ltm.performance_ec,
              performance_percentage_ec: ltm.performance_percentage_ec,
              // tgt_ipt: ltm.tgt_ipt,
              // performance_percentage_ipt: ltm.tgt_ipt,

              performance_ipt: ltm.performance_ipt,
              tgt_ipt: ltm.tgt_ipt,
              performance_percentage_ipt: ltm.performance_percentage_ipt,
            },
          ],
        })
      })

      return res
    })
  }

  const getAllListSalesman = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery([`${apiPath}/salesman/lists`, query], () => doFetchAllListSalesman({ query }), {
      keepPreviousData: true,
      onSuccess,
      onError,
      enabled,
    })

  const doFetchListSalesman = async ({ query, callback = null }) => {
    return client(`/${apiPath}/salesman/lists`, {
      params: {
        limit: query.limit,
        page: query.page,
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    }).then((res) => {
      res.data.datas.map((v, i) => {
        const lm = v.last_month
        const ltm = v.last_three_month

        Object.assign(v, {
          key: i,
          children: [
            {
              key: Math.floor(Math.random() * 99999999999) + 1,
              periode: '',
              depo: '',
              salesman: 'Last Month',
              qty_tgt: lm.qty_tgt,
              currency_id: lm.currency_id,
              qty_real: lm.qty_real,
              qty_percentage: lm.qty_percentage,
              value_tgt: lm.value_tgt,
              value_real: lm.value_real,
              value_percentage: lm.value_percentage,
              performance_cb: lm.performance_cb,
              performance_roa: lm.performance_roa,
              performance_percentage_roa: lm.performance_percentage_roa,
              performance_sc: lm.performance_sc,
              performance_ec: lm.performance_ec,
              performance_percentage_ec: lm.performance_percentage_ec,
              performance_ipt: lm.performance_ipt,
              tgt_ipt: lm.tgt_ipt,
              performance_percentage_ipt: lm.performance_percentage_ipt,
            },
            {
              key: Math.floor(Math.random() * 99999999999) + 1,
              periode: '',
              depo: '',
              salesman: 'Avg. Last 3 Month',
              qty_tgt: ltm.qty_tgt,
              currency_id: ltm.currency_id,

              qty_real: ltm.qty_real,
              qty_percentage: ltm.qty_percentage,
              value_tgt: ltm.value_tgt,
              value_real: ltm.value_real,
              value_percentage: ltm.value_percentage,
              performance_cb: ltm.performance_cb,
              performance_roa: ltm.performance_roa,
              performance_percentage_roa: ltm.performance_percentage_roa,
              performance_sc: ltm.performance_sc,
              performance_ec: ltm.performance_ec,
              performance_percentage_ec: ltm.performance_percentage_ec,
              performance_ipt: ltm.performance_ipt,
              tgt_ipt: ltm.tgt_ipt,
              performance_percentage_ipt: ltm.performance_percentage_ipt,
            },
          ],
        })
      })

      if (callback !== null) {
        callback(res)
      } else {
        return res
      }
      // callback!==null ? callback(res): return res;
      // return res
    })
  }

  const getListSalesman = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery([`${apiPath}/salesman/lists`, query], () => doFetchListSalesman({ query }), {
      keepPreviousData: true,
      onSuccess,
      onError,
      enabled,
    })

  const doSKU = async ({ query, callback = null }) => {
    console.log("kesini");
    // &category=SNACKS&product=AHH
    return client(`/${apiPath}/sku-achievement/lists`, {
      params: {
        limit: query.limit,
        page: query.page,
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    }).then((res) => {
      return res
    })
  }
  const getSKUAchievement = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery([`${apiPath}/sku-achievement/lists`, query], () => doSKU({ query }), {
      keepPreviousData: true,
      onSuccess,
      onError,
      enabled,
    })


  const doFetchListOutletAchievement = async ({ query, callback = null }) => {
    return client(`/${apiPath}/outlet-achievement/lists`, {
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      },
      params: {
        limit: query.limit,
        page: query.page,
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    })
      .then((res) => {
        res.data.datas.map((v, i) => {
          const lm = v.last_month
          const ltm = v.last_three_month
          Object.assign(v, {
            subdisctrict: v.subdistrict !== '' ? v.subdistrict : '-',
            key: i,
            children: [
              {
                key: Math.floor(Math.random() * 99999999999) + 1,
                outlet: '',
                address: '',
                subdisctrict: '',
                route: '',
                outlet_type: '',
                fc: 'Last Month',
                currency_id: lm.currency_id,

                qty_tgt: lm.qty_tgt,
                qty_real: lm.qty_real,
                qty_percentage: lm.qty_percentage,
                value_tgt: lm.value_tgt,
                value_real: lm.value_real,
                value_percentage: lm.value_percentage,
                performance_cb: lm.performance_cb,
                performance_roa: lm.performance_roa,
                performance_percentage_roa: lm.performance_percentage_roa,
                performance_sc: lm.performance_sc,
                performance_ec: lm.performance_ec,
                performance_percentage_ec: lm.performance_percentage_ec,
                tgt_ipt: lm.tgt_ipt,
                performance_ipt: lm.performance_ipt,
                performance_percentage_ipt: lm.performance_percentage_ipt,
              },
              {
                key: Math.floor(Math.random() * 99999999999) + 1,
                outlet: '',
                address: '',
                subdisctrict: '',
                route: '',
                outlet_type: '',
                fc: 'Avg. Last 3 Month',
                currency_id: ltm.currency_id,

                qty_tgt: ltm.qty_tgt,
                qty_real: ltm.qty_real,
                qty_percentage: ltm.qty_percentage,
                value_tgt: ltm.value_tgt,
                value_real: ltm.value_real,
                value_percentage: ltm.value_percentage,
                performance_cb: ltm.performance_cb,
                performance_roa: ltm.performance_roa,
                performance_percentage_roa: ltm.performance_percentage_roa,
                performance_sc: ltm.performance_sc,
                performance_ec: ltm.performance_ec,
                performance_percentage_ec: ltm.performance_percentage_ec,
                tgt_ipt: ltm.tgt_ipt,
                performance_ipt: ltm.performance_ipt,
                performance_percentage_ipt: ltm.performance_percentage_ipt,
              },
            ],
          })
        })
        if (callback !== null) {
          callback(res)
        } else {
          return res
        }
      })
      .catch((e) => {
        if (callback !== null) {
          callback(e)
        } else {
          return e
        }
      })
  }

  const getListOutletAchievement = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery(
      [
        // `${apiPath}/outlet-achievement/lists?company_id=PP01&flag=0&depo=P118&periode=202308&sort_by=DESC&filter_by=VALUE-REAL&limit=10&page=1`,
        `${apiPath}/outlet-achievement/lists`,
        query,
      ],
      () => doFetchListOutletAchievement({ query }),
      {
        keepPreviousData: true,
        onSuccess,
        onError,
        enabled,
      },
    )

  const doFetchList = async ({ query }) =>
    client(`/${apiPath}/lists`, {
      params: {
        limit: query.limit,
        page: query.page,
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    }).then((res) => res)

  const getList = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery([`${apiPath}/lists`, query], () => doFetchList({ query }), {
      keepPreviousData: true,
      onSuccess,
      onError,
      enabled,
    })

  const doFetchDownloadList = async ({ query }) =>
    client(`/${apiPath}/download`, {
      params: {
        limit: query.limit,
        page: query.page,
        file_type: 'xlsx',
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    }).then((res) => res)

  const getListDownload = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery([`${apiPath}/download`, query], () => doFetchDownloadList({ query }), {
      keepPreviousData: true,
      onSuccess,
      onError,
      enabled,
    })

  const doFetchAllListSalesmanPerformance = async ({ query }) => client(`/${apiPath}/salesman-performance/mobile/lists`, {
    params: {
      limit: query.limit,
      page: query.page,
      company_id: localStorage.getItem('companyCode'),
      ...query,
    },
  }).then((res) => {
    if (res.data.datas === null) {
      // for display popup when no datas
      res.data.datas.forEach((v) => {
        console.log('error')
      })
    }
    return res
  })

  const getAllListSalesmanPerformance = ({ query = {}, onSuccess, onError, enabled = false }) =>
    useQuery([`${apiPath}/salesman-performance/mobile/lists`, query], () => doFetchAllListSalesmanPerformance({ query }), {
      keepPreviousData: true,
      onSuccess,
      onError,
      enabled,
    })

  const doFetchDownloadSalesmanPerformance = async ({ query, callback = null }) =>
    client(`/${apiPath}/salesman-performance/download`, {
      params: {
        limit: query.limit,
        page: query.page,
        file_type: 'pdf',
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    })
      .then((res) => (callback !== null ? callback(res) : res))
      .catch((e) => (callback !== null ? callback(e, true) : e))

  const doFetchDownloadSKUAchievement = async ({ query, callback = null }) =>
    client(`/${apiPath}/sku-achievement/download`, {
      params: {
        limit: query.limit,
        page: query.page,
        file_type: 'xlsx',
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    })
      .then((res) => (callback !== null ? callback(res) : res))
      .catch((e) => (callback !== null ? callback(e, true) : e))

  const doFetchDownloadSKUAchievementSalesman = async ({ query, callback = null }) =>
    client(`/${apiPath}/sku-achievement/salesman/download`, {
      params: {
        limit: query.limit,
        page: query.page,
        file_type: 'xlsx',
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    })
      .then((res) => (callback !== null ? callback(res) : res))
      .catch((e) => (callback !== null ? callback(e, true) : e))

  const doFetchDownloadSKUSalesmanByOutlet = async ({ query, callback = null }) =>
    client(`/${apiPath}/sku-achievement/outlet/download`, {
      params: {
        limit: query.limit,
        page: query.page,
        file_type: 'xlsx',
        company_id: localStorage.getItem('companyCode'),
        ...query,
      },
    })
      .then((res) => (callback !== null ? callback(res) : res))
      .catch((e) => (callback !== null ? callback(e, true) : e))

  return {
    doFetchDownloadListOutletAchievement,
    doFetchListOutletAchievement,
    doFetchDownloadListTopSalesman,
    getListDownloadListTopSalesman,
    doFetchListSalesman,
    getAllListSalesman,
    getListSalesman,
    getSKUAchievement,
    getListOutletAchievement,
    getList,
    getListDownload,
    doFetchAllListSalesmanPerformance,
    getAllListSalesmanPerformance,
    doFetchDownloadSalesmanPerformance,
    doFetchDownloadSKUAchievement,
    doFetchDownloadSKUAchievementSalesman,
    doFetchDownloadSKUSalesmanByOutlet,
  }
}
