import React, { useState, useEffect } from 'react'
import { Button } from 'pink-lava-ui'
import { Modal } from 'antd'
import Router, { useRouter } from 'next/router'

import { ExclamationCircleFilled } from '@ant-design/icons'
import { handleBackPermission } from 'src/api/BaseApi'

export default function ModalDialogError({ show = false, msg = '', callback }) {
  const router = useRouter()
  const [modalError, setModalError] = useState(false)
  const { pathname } = router

  const handleBack = () => {
    // handleBackPermission(true);
    setModalError(false)
    Router.replace(
      {
        pathname,
        query: {},
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <Modal
      open={show}
      onOk={() => {
        callback(false)
        handleBack()
      }}
      onCancel={() => {
        callback(false)
        handleBack()
      }}
      footer={null}
      destroyOnClose
      maskClosable={false}
      centered
    >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <p
          // textAlign="center"
          style={{
            textAlign: 'center',
            color: '#ed1c24',
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 8,
          }}
        >
          <>
            <ExclamationCircleFilled />
            {/* <ExclamationCircleOutlined /> */}
            &nbsp;Warning
          </>
        </p>
      </div>
      <div
        style={{
          paddingLeft: '50px',
          paddingRight: '50px',
          display: 'flex',
          gap: 10,
          flexDirection: 'column',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {msg}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 20,
          paddingLeft: '50px',
          paddingRight: '50px',
        }}
      >
        <Button
          size="big"
          style={{ flexGrow: 1 }}
          variant="primary"
          onClick={() => {
            callback(false)
            handleBack()
          }}
        >
          OK
        </Button>
      </div>
    </Modal>
  )
}
