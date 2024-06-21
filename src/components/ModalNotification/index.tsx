import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { Button, Text } from 'pink-lava-ui'
import { ExclamationCircleOutlined } from '@ant-design/icons'
interface IProps {
  callback?: Function
  message?: string
}

export default function ModalNotification(props: IProps) {
  const [handleError, setHandleError] = useState(props.message)

  return (
    <Modal
      // ok
      footer={null}
      open={handleError !== ''}
      onCancel={() => {
        setHandleError('')
        props.callback()
      }}
      onOk={() => {
        props.callback()
        setHandleError('')
      }}
      centered
      destroyOnClose
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text
          textAlign="center"
          style={{ color: '#ed1c24', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}
        >
          <>
            <ExclamationCircleOutlined rev={undefined} />
            &nbsp;Warning
          </>
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
        <div style={{ fontWeight: 'bold' }}>{handleError}</div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            props.callback()
            setHandleError('')
          }}
        >
          OK
        </Button>
      </div>
    </Modal>
  )
}
