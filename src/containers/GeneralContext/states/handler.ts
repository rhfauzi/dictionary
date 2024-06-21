import { DispatchType } from './reducer'
import { StateType } from './state'

export function baseHandler(state: StateType, dispatch: React.Dispatch<DispatchType>) {
  function runProcess(payload: string) {
    dispatch({ type: 'processing', payload })
  }

  function stopProcess() {
    dispatch({ type: 'processing', payload: undefined })
  }

  function showConfirm(payload: string) {
    dispatch({ type: 'confirm', payload })
  }

  function unShowConfirm() {
    dispatch({ type: 'confirm', payload: 'undefined' })
  }

  function handleShowModalCreate(payload: boolean) {
    dispatch({ type: 'showModalCreate', payload })
  }

  function handleShowModalUpdate(payload: boolean) {
    dispatch({ type: 'showModalUpdate', payload })
  }

  function handleShowModalUploadForm(payload: boolean) {
    dispatch({
      type: 'showModalUploadForm',
      payload,
    })
  }

  function handleShowModalUploadFile(payload: boolean) {
    dispatch({
      type: 'showModalUploadFile',
      payload,
    })
  }

  function handleShowModalQR(payload: boolean) {
    dispatch({
      type: 'showModalQR',
      payload,
    })
  }

  function handleSelectCheckBox(payload: any) {
    dispatch({ type: 'selectCheckBox', payload })
  }

  function handleFormCreate(payload: any) {
    dispatch({
      type: 'formCreatePayload',
      payload,
    })
  }

  function handleFormUpdate(payload: any) {
    dispatch({
      type: 'formUpdatePayload',
      payload,
    })
  }

  function handleActivationStatus(payload: any) {
    dispatch({
      type: 'activationStatus',
      payload,
    })
  }

  function handleFieldDeletion(payload: boolean) {
    dispatch({
      type: 'confirmDeleteState',
      payload,
    })
  }

  function handleFormDelete(payload: any) {
    dispatch({
      type: 'formDeletePayload',
      payload,
    })
  }

  function handleFormBuffer(payload: any) {
    dispatch({
      type: 'formBuffer',
      payload,
    })
  }

  function handleShowModal(payload: StateType['showModal']) {
    dispatch({
      type: 'showModal',
      payload,
    })
  }

  function handleBranchMultipleValue(payload: any) {
    dispatch({
      type: 'branchMultipleValue',
      payload,
    })
  }

  function unShowModal() {
    dispatch({
      type: 'showModal',
      payload: undefined,
    })
  }

  return {
    runProcess,
    stopProcess,
    showConfirm,
    unShowConfirm,
    handleShowModalCreate,
    handleShowModalUpdate,
    handleShowModalUploadForm,
    handleShowModalUploadFile,
    handleShowModalQR,
    handleFormCreate,
    handleFormUpdate,
    handleFormDelete,
    handleActivationStatus,
    handleSelectCheckBox,
    handleFieldDeletion,
    handleShowModal,
    handleFormBuffer,
    handleBranchMultipleValue,
    unShowModal,
  }
}
