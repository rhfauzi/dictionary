import useTable from 'src/hooks/useTable'

interface filtersType {
  year?: string
}

interface dataFormType {
  weight?: number
  value_type?: string
  uom?: string
  name?: string
  target?: number
  kpi_condition?: string
  details?: any[]
  edit_payload?: any
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
