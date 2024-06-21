import useTable from 'src/hooks/useTable/index'

interface PayloadCreate {
  order_type_id?: string
}
export interface StateType {
  dataForm?: PayloadCreate
  processing?: string
  confirm?: string
  data?: any
  tableTabQuotation?: ReturnType<typeof useTable>
  newSalesOrder?: string
}
