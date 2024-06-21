import useTable from 'src/hooks/useTable'

interface filtersType {
  year?: string
  month_from?: string
  month_to?: string
}

interface dataFormType {
  code?: string
  country_code?: string
  job_family_code?: string
  job_grade_id?: number
  job_title_id?: number
  legal_entity_code?: string
  sub_job_family_code?: string
  is_active?: boolean
}

interface paginationType {
  limit_per_page: number
  current_page: number
  total_page: number
  total_rows: number
}

export interface StateType {
  table?: ReturnType<typeof useTable>
  processing?: string
  confirm?: string
  showModal?: 'create' | 'details'
  showModalStatus?: boolean
  dataForm?: dataFormType
  disableButton: boolean
  filters?: filtersType
  pagination?: paginationType
  translate?: any
  datas?: any
  selectedRowKeys?: any[]
  refetch?: boolean
  optJobTitle?: any[]
  optLegalEntity?: any[]
  optCountry?: any[]
  optJobFamily?: any[]
  optSubJobfamily?: any[]
  optJobGrade?: any[]
}
