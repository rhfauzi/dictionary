import React from 'react'
import { Typography, message } from 'antd'
import { Popup } from 'src/components'
import { Button } from 'pink-lava-ui'
import { useSubJobFamilyContext } from '../../states/useContext'
import { createSubJobFamily, updateSubJobFamily } from 'src/api/sub-job-family'

export default function ConfirmSubmit() {
  const {
    state: { dataForm, showModal },
    handler: { handleConfirm, runProcess, stopProcess },
  } = useSubJobFamilyContext()
  const isModuleCreate = showModal === 'create'
  const func = showModal === 'create' ? createSubJobFamily : updateSubJobFamily

  return (
    <Popup>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Confirm {isModuleCreate ? 'Save' : 'Update'}
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0, fontWeight: 'bold' }}>
        {isModuleCreate
          ? 'Are you sure want to save Sub Job Family ?'
          : 'Are you sure want to update Sub Job Family ?'}
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
            runProcess(`Wait for ${isModuleCreate ? 'submitting' : 'updating'} Sub Job Family`)

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
