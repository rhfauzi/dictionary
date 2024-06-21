import useTable from 'src/hooks/useTable'

interface filtersType {
  year?: string
}

interface dataFormType {
  description?: string
  details?: any[]
  kpi_condition?: string
  kpi_category?: string
  name?: string
  uom?: string
  value_type?: string
  weight?: number
  year?: string
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
}
