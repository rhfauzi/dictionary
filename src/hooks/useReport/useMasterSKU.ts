import { STRLOCALSTORAGE } from 'src/containers/PageReportSalesman/utils/strLocalStorage'
import { getClient } from './changeClient';

export const FetchSKUCategory = async ({ query = {}, callback = null }) => {
  const client  = getClient();
  await client('v1/master-data/product/category/lists', {
    params: {
      company_code: localStorage.getItem('companyCode'),
      ...query,
    },
  })
    .then((res) => (callback !== null ? callback(res.data.datas) : res.data.datas))
    .catch((e) => (callback !== null ? callback(e, true) : e))
}
export const FetchSKUBrand = async ({ query = {}, callback = null }) => {
  const client  = getClient();
  await client('v1/master-data/brand/lists', {
    params: {
      company_code: localStorage.getItem('companyCode'),
      ...query,
    },
  })
    .then((res) => (callback !== null ? callback(res.data.datas) : res.data.datas))
    .catch((e) => (callback !== null ? callback(e, true) : e))
}
export const FetchSKURetailPrice = async ({ query = {}, callback = null }) => {
  const client  = getClient();
  await client('v1/master-data/retail-price/lists', {
    params: {
      company_code: localStorage.getItem('companyCode'),
      ...query,
    },
  })
    .then((res) => (callback !== null ? callback(res.data.datas) : res.data.datas))
    .catch((e) => (callback !== null ? callback(e, true) : e))
}
export const FetchDataProductBySalesman = async ({ query, callback = null }) => {
  const FIL: any = STRLOCALSTORAGE.getStringify(STRLOCALSTORAGE.ALLSALESSKU.FILTER);
  const FILSK: any = STRLOCALSTORAGE.getStringify(STRLOCALSTORAGE.ALLSALESSKU.PRODUCT_BY_SALESMAN);
  const client  = getClient();
  await client('v1/report-sales/sku-achievement/salesman/lists', {
    params: {
      company_code: localStorage.getItem('companyCode'),
      flag: 0,
      depo: FIL?.depo,
      brand: FILSK?.brand_id ?? '',
      periode: FIL?.periode,
      category: FILSK?.category_id ?? '',
      retail_price: FILSK?.retail_price_id ?? '',
      filter_by: query?.filter_by,
      sort_by: query?.sort_by,
      ...query,
    },
  })
    .then((res) => (callback !== null ? callback(res) : res))
    .catch((e) => (callback !== null ? callback(e, true) : e))
}

export const FetchDataProductByOutlet = async ({ query, callback = null }) => {
  const FIL: any = STRLOCALSTORAGE.getStringify(STRLOCALSTORAGE.ALLSALESSKU.FILTER);
  const FILSK: any = STRLOCALSTORAGE.getStringify(STRLOCALSTORAGE.ALLSALESSKU.PRODUCT_BY_SALESMAN);
  const PRODUCT_ID: any = STRLOCALSTORAGE.get(STRLOCALSTORAGE.ALLSALESSKU.PRODUCT_ID);
  const client  = getClient();
  await client('v1/report-sales/sku-achievement/outlet/lists', {
    params: {
      company_code: localStorage.getItem('companyCode'),
      flag: 0,
      depo: FIL?.depo,
      brand: FILSK?.brand_id ?? '',
      periode: FIL?.periode,
      category: FILSK?.category_id ?? '',
      retail_price: FILSK?.retail_price_id ?? '',
      filter_by: query?.filter_by,
      sort_by: query?.sort_by,
      salesman: query?.salesman,
      product: PRODUCT_ID,
      ...query,
    },
  })
    .then((res) => (callback !== null ? callback(res) : res))
    .catch((e) => (callback !== null ? callback(e, true) : e))
}