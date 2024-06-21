import React from 'react'
import { Popover, Typography } from 'antd'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { deleteJobGrade } from 'src/api/job-grade'
import { useJobGradeContext } from '../../states'

export default function ConfirmDelete() {
  const {
    state: { selectedRowKeys },
    handler: { handleConfirm, runProcess, stopProcess },
  } = useJobGradeContext()

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
        Are you sure to delete job grade item
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
            runProcess('Wait for deleting job grade')
            try {
              deleteJobGrade({ code: selectedRowKeys })
                .then(() => {
                  handleConfirm('delete-success')
                })
                .catch(() => {
                  handleConfirm(undefined)
                })
              stopProcess()
            } catch (err) {
              handleConfirm(undefined)
              stopProcess()
            }
          }}
        >
          Delete
        </Button>
      </div>
    </Popup>
  )
}
