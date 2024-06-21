import React from 'react'
import { useSubJobFamilyContext } from '../states'
import {
  ConfirmDelete,
  ConfirmDeleteSuccess,
  ConfirmSubmit,
  ConfirmActiveSuccess,
} from './alerts'

export default function SectionConfirm() {
  const {
    state: { confirm },
  } = useSubJobFamilyContext()

  return (
    <React.Fragment>
      {confirm === 'confirm-submit' && <ConfirmSubmit />}
      {confirm === 'delete' && <ConfirmDelete />}
      {confirm === 'delete-success' && <ConfirmDeleteSuccess />}
      {confirm === 'success-active' && <ConfirmActiveSuccess />}
    </React.Fragment>
  )
}
