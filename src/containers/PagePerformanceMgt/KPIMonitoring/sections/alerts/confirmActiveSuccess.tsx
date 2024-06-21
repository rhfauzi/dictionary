import React from 'react'
import { Popup } from 'src/components'
import { Button, Text } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { CheckCircleFilled } from '@ant-design/icons'
import { useKPIMonitoringContext } from '../../states'

export default function ConfirmActiveSuccess() {
  const router = useRouter()
  const {
    state: { dataForm },
  } = useKPIMonitoringContext()

  return (
    <Popup>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#00C572', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <CheckCircleFilled /> Success
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 4,
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <div>Job Code has been successfully {dataForm?.is_active ? 'activate' : 'inactivate'}</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          className="hc-button"
          onClick={() => {
            router.push('/master-data/job-code')
          }}
        >
          OK
        </Button>
      </div>
    </Popup>
  )
}
