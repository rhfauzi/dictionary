/* eslint-disable space-before-function-paren */
import React, { useContext } from 'react'
import { useCreatePageProvider } from 'src/hooks/contexts/useCreateProvider'
import { useHandler } from './handler'
import { baseReducer, DispatchType } from './reducer'
import { StateType } from './state'
import { UserContext } from 'src/contexts/UserContext'

interface ctxType {
  state: StateType
  handler: ReturnType<typeof useHandler>
}
const ctx = React.createContext<ctxType>(undefined)

export function useSalesSalesOrderCreateProvider() {
const { menuActived } = useContext(UserContext)

  const now = new Date().toISOString()
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
  const initialValue: StateType = {
    canSaveAsDraft: true,
    optionsBranch: [],
    optionsOrderType: [],
    optionsSalesman: [],
    optionsSalesOrg: [],
    dataForm: {
      order_type_id: '',
      company_id: menuActived,
      source_id: 'Z02',
      order_date: now,
      delivery_date: tomorrow,
      pricing_date: now,
      valid_from: now,
      valid_to: tomorrow,
      customer_ref: '',
      currency_id: 'IDR',
      term_id: 'Z000',
    },
  }
  return useCreatePageProvider<ctxType, StateType, DispatchType, typeof useHandler>(
    ctx,
    baseReducer,
    useHandler,
    initialValue,
  )
}

export function useSalesSalesOrderCreateContext() {
  return React.useContext(ctx)
}
