export interface CommonPagination {
  total: number
  per_page: number
  previous_page: number
  current_page: number
  next_page: number
  total_page: number
}

export interface CommonListResponse<T = any> {
  status: string
  message: string
  data: {
    results: T[]
    result: T[]
    pagination: CommonPagination
    rows: T[]
  }
}

export interface CommonDetailResponse<T> {
  data: T
}

export interface CommonDetailParams {
  id?: string
  shipment_id?: string
  delivery_id?: string
  doc_type?: string
  company_id?: string
  requestNumber?: string
  salesman_id?: string
  customer_id?: string
  billing_id?: string
}

export interface CommonFiltersPayload {
  field: string
  option: string
  from_value?: string | boolean | any
  to_value?: string
  data_type?: string
}

export interface CommonListParams {
  page?: number
  limit?: number
  filters?: CommonFiltersPayload[]
  company_id?: string
}
export interface DeleteParams {
  page?: number
  limit?: number
  filters?: CommonFiltersPayload[]
  company_id?: string
  product_ids?: any
}

export interface CurrencyListParams {
  page?: number
  limit?: number
  filters?: CommonFiltersPayload[]
  company_id?: string
}
