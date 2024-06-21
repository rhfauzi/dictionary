/* eslint-disable no-use-before-define */
import React from 'react'
import { Modal } from 'antd'
import { Button, Text } from 'pink-lava-ui'
import { ILHCThankYou } from 'src/assets/ilustration'
import styled from 'styled-components'

interface PropsDatepicker {
  open?: boolean
  onClose?: (val: any) => any
  onSubmit?: (val: any) => any
  closable?: boolean
  maskClosable?: boolean
  title?: string
  subTitle?: string
}

export default function ConfirmSuccessSubmit({
  open,
  onClose,
  onSubmit,
  closable = true,
  maskClosable = true,
  title = 'Your Registration has been succesfully submitted',
  subTitle = '',
  ...props
}: PropsDatepicker) {
  const footer = (
    <div style={{ display: 'flex', gap: 10, margin: '10px 0px' }}>
      <Button
        size="big"
        variant="tertiary"
        onClick={() => {
          onClose(false)
        }}
        style={{
          flexGrow: 1,
          border: '2px solid #2771c7',
          color: '#2771c7',
        }}
      >
        Close
      </Button>
    </div>
  )

  return (
    <>
      <ModalCustom
        zIndex={500}
        width={392}
        closable={closable}
        open={open}
        onCancel={() => onClose(false)}
        footer={footer}
        maskClosable={maskClosable}
      >
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '263px', margin: '20px' }}>
            <ILHCThankYou />
          </div>
          <Text variant="headingRegular" style={{ textAlign: 'center' }}>
            {title}
          </Text>
          <Text variant="body2" style={{ textAlign: 'center' }}>
            {subTitle}
          </Text>
        </div>
      </ModalCustom>
    </>
  )
}

const ModalCustom = styled(Modal)`
  .ant-modal-body {
    padding: 0px 16px;
  }
`