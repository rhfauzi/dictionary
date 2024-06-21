import { DispatchType } from './reducer'
import { StateType } from './state'

interface paginationType {
  limit_per_page: number
  current_page: number
  total_page: number
  total_rows: number
}

export function baseHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  function runProcess(payload: string) {
    dispatch({ type: 'processing', payload })
  }

  function stopProcess() {
    dispatch({ type: 'processing', payload: undefined })
  }

  function handleConfirm(payload: string) {
    dispatch({ type: 'confirm', payload })
  }

  function handleModal(payload: any) {
    dispatch({ type: 'showModal', payload })
  }

  function handleDataForm(payload: any) {
    dispatch({ type: 'dataForm', payload })
  }

  function handleDisableButton(payload: StateType['disableButton']) {
    dispatch({ type: 'disableButton', payload })
  }

  function handleFilters(field: string, value: any) {
    dispatch({
      type: 'filters',
      payload: { ...state.filters, [field]: value },
    })
  }

  function handlePagination(payload: paginationType) {
    dispatch({ type: 'pagination', payload })
  }

  function handleDatas(payload: any) {
    dispatch({ type: 'datas', payload })
  }

  function handleSelectedRowKeys(payload: any) {
    dispatch({ type: 'selectedRowKeys', payload })
  }

  function handleReFetch(payload: boolean) {
    dispatch({ type: 'refetch', payload })
  }

  function handleModalStatus(payload: any) {
    dispatch({ type: 'showModalStatus', payload })
  }

  function handleOptionJobFamily(payload: any) {
    dispatch({ type: 'optionJobFamily', payload })
  }

  return {
    handleDisableButton,
    runProcess,
    stopProcess,
    handleConfirm,
    handleModal,
    handleDataForm,
    handleFilters,
    handlePagination,
    handleDatas,
    handleSelectedRowKeys,
    handleReFetch,
    handleModalStatus,
    handleOptionJobFamily
  }
}
