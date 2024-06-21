/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useAppContext } from 'src/contexts'
import { addColumn } from 'src/utils/createColumns'
import { UserContext } from 'src/contexts/UserContext'
import { useRefreshToken } from 'src/generalReducer'
import { baseHandler, baseReducer } from './states'
import { StateType } from './states/state'

interface HaveCheckBoxType {
  rowKey: string
  member: any
}

interface useTableProps {
  // eslint-disable-next-line no-unused-vars
  funcApi?: (body: any) => Promise<any>
  haveCheckBox?: HaveCheckBoxType[] | 'All'
  columns: any[]
  data?: any[]
  removeHideShowColums?: boolean
  hasCompany?: boolean
  dynamicFilterField?: any
  isEmpty?: boolean
  dynamicTableField?: boolean
}

export default function useTable({
  haveCheckBox,
  columns,
  data,
  funcApi,
  removeHideShowColums,
  hasCompany = false,
  dynamicFilterField,
  isEmpty = false,
  dynamicTableField,
}: useTableProps) {
  const { menuActived } = React.useContext(UserContext)
  const app = useAppContext()
  const isValueFromPrev = app.state.isRequestPrevious && app.state.readyFor === funcApi?.name

  const defaultBody = {
    filters: [],
    limit: 20,
    page: 1,
  }
  const initialValue: StateType = {
    body: isValueFromPrev ? app.state.table_log : defaultBody,
    columns,
    columnsAreSetted: columns,
    data: data || [],
    hiddenColumns: [],
    loading: false,
    rowSelection: {},
    selected: [],
    total: 0,
    totalPage: 0,
    emptySearch: false,
  }
  const [state, dispatch] = React.useReducer(baseReducer, initialValue)
  const handler = baseHandler(state, dispatch)
  const isFirstUpdate = React.useRef(true)

  const refreshToken = useRefreshToken()
  React.useEffect(() => {
    if (refreshToken) {
      handler.getApi(funcApi, hasCompany, menuActived, dynamicFilterField)
      handler.handleSaveTableLog(funcApi, app)
    }
  }, [refreshToken])

  React.useEffect(() => {
    if (!state.loading) {
      handler.getApi(funcApi, hasCompany, menuActived, dynamicFilterField)
      handler.handleSaveTableLog(funcApi, app)
    }
  }, [state.body])

  React.useEffect(() => {
    if (!isEmpty) {
      dispatch({ type: 'loading', payload: [] })
    } else if (!state.loading) {
      handler.getApi(funcApi, hasCompany, menuActived, dynamicFilterField)
      handler.handleSaveTableLog(funcApi, app)
    }
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false
    } else {
      const timer = setTimeout(() => {
        if (Array.isArray(state.data) && state.data.length === 0) {
          dispatch({
            type: 'emptySearch',
            payload: true,
          })
        } else {
          dispatch({
            type: 'emptySearch',
            payload: false,
          })
        }
      }, 1500)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [state.body, isEmpty])

  React.useEffect(() => {
    handler.handleDefineTableProps(haveCheckBox, removeHideShowColums, columns)
    handler.handleDefineDescription()
  }, [state.body, state.loading, state.data, state.hiddenColumns, state.rowSelection])

  React.useEffect(() => {
    handler.handleRowSelection(haveCheckBox)
  }, [state.selected])

  React.useEffect(() => {
    handler.handleDefinePaginationProps()
  }, [state.page, state.limit, state.total, state.totalPage])

  React.useEffect(() => {
    handler.handleTightColumns(columns)
  }, [state.columns])

  React.useEffect(() => {
    if (funcApi && !isFirstUpdate.current && dynamicTableField) {
      dispatch({ type: 'loading', payload: [] })
      handler.getApi(funcApi, hasCompany, menuActived, dynamicFilterField)
      handler.handleSaveTableLog(funcApi, app)
      dispatch({
        type: 'columns',
        payload: columns,
      })
      handler.handleRowSelection('All', true)
    }
  }, [funcApi])

  return { state, handler }
}

useTable.addColum = addColumn
