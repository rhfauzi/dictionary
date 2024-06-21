import { Moment } from 'moment'

export interface TableProfitListDataType {
  id: string
  key: string
  name: string
}

export interface BodyDeleteDataTypes {
  profit_center_id: any
}

export interface FormProfitState {
  [key: string]: any
}

//GLAccount
export interface FormStateGLAccount {
  [key: string]: any
}

export interface BodyDeleteGLAccountTypes {
  gl_account_id: any
}
