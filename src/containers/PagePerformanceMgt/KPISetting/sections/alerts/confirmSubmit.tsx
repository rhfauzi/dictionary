import React from 'react'
import { Typography, message } from 'antd'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useKPISettingContext } from '../../states/useContext'
import { createKPISetting, updateKPISetting } from 'src/api/kpi-settings'

export default function ConfirmSubmit() {
  const {
    state: { dataForm, showModal, processing, disableButton },
    handler: { handleConfirm, runProcess, stopProcess, handleDisableButton},
  } = useKPISettingContext()
  const isModuleCreate = showModal === 'create'
  const func = showModal === 'create' ? createKPISetting : updateKPISetting

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm {isModuleCreate ? 'Save' : 'Update'}
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        {isModuleCreate
          ? 'Are you sure want to save KPI Setting ?'
          : 'Are you sure want to update KPI Setting ?'}
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
          disabled={disableButton}
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          className="hc-button"
          onClick={async () => {
            runProcess(`Wait for ${isModuleCreate ? 'submitting' : 'updating'} KPI Setting`)
            handleDisableButton(true)
            try {
              const res = await func(dataForm)
              if (res?.status === 200 || res?.status === 201) {
                handleConfirm('success-submit')
                handleDisableButton(false)
              } else {
                handleConfirm(undefined)
                handleDisableButton(false)
              }
              stopProcess()
            } catch (e) {
              handleConfirm(undefined)
              handleDisableButton(false)
            }
          }}
        >
          Yes
        </Button>
      </div>
    </Popup>
  )
}
