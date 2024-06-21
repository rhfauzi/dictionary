import { DispatchType } from './reducer'
import { StateType } from './state'

export function baseHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  const { dataForm } = state

  function runProcess(payload: string): void {
    dispatch({ type: 'processing', payload })
  }

  function stopProcess(): void {
    dispatch({ type: 'processing', payload: undefined })
  }

  function showConfirm(payload: string): void {
    dispatch({ type: 'confirm', payload })
  }

  function unShowConfirm(): void {
    dispatch({ type: 'confirm', payload: undefined })
  }

  function setNewSalesOrder(payload: string) {
    dispatch({ type: 'newSalesOrder', payload })
  }

  function onChangeForm(field: keyof StateType['dataForm'], value: any) {
    dispatch({
      type: 'dataForm',
      payload: { ...dataForm, [field]: value },
    })
  }
  return {
    runProcess,
    stopProcess,
    showConfirm,
    unShowConfirm,
    setNewSalesOrder,
    onChangeForm,
  }
}
