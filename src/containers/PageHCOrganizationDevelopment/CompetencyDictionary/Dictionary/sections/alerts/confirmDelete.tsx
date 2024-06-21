import React from 'react'
import { Typography } from 'antd'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { deleteCompetency } from 'src/api/competency-dictionary/dictionary'
import { useDictionaryContext } from '../../states'

export default function ConfirmDelete() {
  const {
    state: { selectedRowKeys },
    handler: { handleConfirm, runProcess, stopProcess },
  } = useDictionaryContext()

  return (
    <Popup onOutsideClick={() => handleConfirm(undefined)} >
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm Delete
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0 }}>
        Are you sure want to delete {selectedRowKeys.length} competency name?
      </Typography.Title>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          className='hc-button-tertiary'
          onClick={() => handleConfirm(undefined)}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          className='hc-button'
          onClick={() => {
            runProcess('Wait for deleting competency')
            deleteCompetency({ id: selectedRowKeys })
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
          Yes
        </Button>
      </div>
    </Popup>
  )
}
