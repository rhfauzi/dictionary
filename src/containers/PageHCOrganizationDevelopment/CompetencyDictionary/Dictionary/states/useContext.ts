import React from 'react'
import { useCreatePageProvider } from 'src/hooks/contexts/useCreateProvider'
import { baseHandler } from './handler'
import { baseReducer, DispatchType } from './reducer'
import { StateType } from './state'

interface ctxType {
  state: StateType
  handler: ReturnType<typeof baseHandler>
}

const ctx = React.createContext<ctxType>(undefined)

export function useDictionaryProvider() {
  return useCreatePageProvider<ctxType, StateType, DispatchType, typeof baseHandler>(
    ctx,
    baseReducer,
    baseHandler,
  )
}

export function useDictionaryContext() {
  return React.useContext(ctx)
}
