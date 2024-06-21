import React from 'react'
import { Popover, Typography } from 'antd'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { deleteDepartmentAndDivision } from 'src/api/department-and-division'
import { useDepartmentAndDivisionContext } from '../../states'

export default function ConfirmDelete() {
  const {
    state: { selectedRowKeys },
    handler: { handleConfirm, runProcess, stopProcess },
  } = useDepartmentAndDivisionContext()

  const firstSelected = selectedRowKeys?.[0] ?? []
  const selectedQuotation = {
    text: selectedRowKeys?.length === 1
      ? firstSelected
      : `${firstSelected}, More +${selectedRowKeys.length - 1}`,
  }

  return (
    <Popup onOutsideClick={() => handleConfirm(undefined)} >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Delete
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Are you sure to delete department & division Item
        <Popover>
          {` ${selectedQuotation.text} ?`}
        </Popover>
      </Typography.Title>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          className='hc-button-tertiary'
          onClick={() => handleConfirm(undefined)}
        >
          Cancel
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          className='hc-button'
          onClick={() => {
            runProcess('Wait for deleting department & division')
            deleteDepartmentAndDivision({ ship_to: selectedRowKeys })
              .then(() => {
                handleConfirm('delete-success')
                stopProcess()
              })
              .catch(() => {
                handleConfirm(undefined)
                stopProcess()
              })
          }}
        >
          Delete
        </Button>
      </div>
    </Popup>
  )
}
