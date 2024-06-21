import { Modal, Typography } from 'antd'
import { Button } from 'pink-lava-ui'

import { updateJobTitle } from 'src/api/job-title'
import { useJobTitleContext } from '../states'
import { ConfirmActiveSuccess } from './alerts'

export default function SectionUpdateStatus() {
  const {
    state: { showModalStatus, dataForm, confirm },
    handler: { handleModalStatus, runProcess, stopProcess, handleConfirm },
  } = useJobTitleContext()

  const handleChangeStatus = async () => {
    handleModalStatus(false)
    runProcess('Wait for updating Job Title')
    stopProcess()
    await updateJobTitle(dataForm)
      .then((res) => {
        console.log(res)
        if (res?.status === 201) {
          handleConfirm('success-active')
        }
        stopProcess()
      })
      .catch(() => {
        handleConfirm(undefined)
        stopProcess()
      })
  }

  const footer = (
    <div style={{ display: 'flex', gap: 10, marginBottom: '20px' }}>
      <Button
        size="big"
        variant="tertiary"
        className="hc-button-tertiary"
        style={{ flexGrow: 1 }}
        onClick={() => {
          handleModalStatus(false)
        }}
      >
        No
      </Button>

      <Button
        size="big"
        variant="primary"
        className="hc-button"
        style={{ flexGrow: 1 }}
        onClick={() => {
          handleChangeStatus()
        }}
      >
        Yes
      </Button>
    </div>
  )

  return (
    <Modal
      width={432}
      open={showModalStatus}
      closable={true}
      onCancel={() => handleModalStatus(false)}
      footer={footer}
    >
      <Typography.Title level={3} style={{ margin: 0 }}>
        {`Confirm ${dataForm?.is_active ? 'Activate' : 'Inactivate'}`}
      </Typography.Title>
      <Typography.Title level={5} style={{ margin: 0 }}>
        {`Are you sure want to ${
          dataForm?.is_active ? 'activate' : 'inactivate'
        } this job title ?`}
      </Typography.Title>

      {confirm === 'success-active' && <ConfirmActiveSuccess />}
    </Modal>
  )
}
