import useTable from 'src/hooks/useTable'

export interface StateType {
  table?: ReturnType<typeof useTable>
  processing?: string
  confirm?: string
  showModalCreate: boolean
  showModalUpdate: boolean
  showModalUploadForm: boolean
  showModalUploadFile: boolean
  showModalQR?: boolean
  formCreatePayload?: any
  formUpdatePayload?: any
  formDeletePayload?: any
  activationStatus?: any
  selectCheckBox?: any
  confirmDeleteState?: any
  branchMultipleValue?: any
  showModal?: 'create' | 'detail'
  formBuffer?: any
}
