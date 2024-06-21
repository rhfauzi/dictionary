import React from 'react'
import { Typography, message } from 'antd'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useKPIMonitoringContext } from '../../states/useContext'
import { createJobCode } from 'src/api/job-code'

export default function ConfirmSubmit() {
  const {
    state: { dataForm, showModal },
    handler: { handleConfirm, runProcess, stopProcess },
  } = useKPIMonitoringContext()
  const isModuleCreate = showModal === 'create'
  const func = showModal === 'create' && createJobCode

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm {isModuleCreate ? 'Save' : 'Update'}
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        {isModuleCreate
          ? 'Are you sure want to save Job Code ?'
          : 'Are you sure want to update Job Code ?'}
      </Typography.Title>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="secondary"
          className="hc-button-tertiary"
          onClick={() => handleConfirm(undefined)}
        >
          No
        </Button>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          className="hc-button"
          onClick={async () => {
            runProcess(`Wait for ${isModuleCreate ? 'submitting' : 'updating'} Job Code`)

            try {
              const res = await func(dataForm)
              if (res?.status === 200 || res?.status === 201) {
                handleConfirm('success-submit')
              } else {
                handleConfirm(undefined)
              }
              stopProcess()
            } catch (e) {
              handleConfirm(undefined)
            }
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
