import React from 'react'
import { useKPISettingContext } from '../states'
import { ConfirmDelete, ConfirmDeleteSuccess, ConfirmSubmit, ConfirmActiveSuccess } from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useKPISettingContext()

  return (
    <React.Fragment>
      {confirm === 'confirm-submit' && <ConfirmSubmit />}
      {confirm === 'delete' && <ConfirmDelete />}
      {confirm === 'delete-success' && <ConfirmDeleteSuccess />}
      {confirm === 'success-active' && <ConfirmActiveSuccess />}
    </React.Fragment>
  )
}
