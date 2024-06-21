/* eslint-disable no-use-before-define */
import React from 'react'
import { Modal } from 'antd'
import { Button, Text } from 'pink-lava-ui'
import { ILHCMapping } from 'src/assets/ilustration'
import styled from 'styled-components'

interface SectionCreateAndUpdateProps {
  open?: boolean
  onClose?: () => void
  onSubmit?: () => void
  closable?: boolean
  maskClosable?: boolean
}

export default function SectionCreateAndUpdate({
  open,
  onClose,
  onSubmit,
  closable = true,
  maskClosable = true,
  ...props
}: SectionCreateAndUpdateProps) {
  const footer = (
    <div style={{ display: 'flex', gap: 10, margin: '10px 0px' }}>
      <Button
        size="big"
        variant="tertiary"
        onClick={() => {
          onClose()
        }}
        style={{
          flexGrow: 1,
          border: '2px solid #2771c7',
          color: '#2771c7',
        }}
      >
        Check Again
      </Button>

      <Button
        size="big"
        variant="primary"
        onClick={() => {
          onSubmit()
        }}
        style={{
          flexGrow: 1,
          border: '2px solid #2771c7',
          color: 'white',
          background: '#2771c7',
        }}
      >
        Submit Now
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
        onCancel={() => onClose()}
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
            <ILHCMapping />
          </div>
          <Text variant="headingRegular" style={{ textAlign: 'center' }}>
            Are you sure to submit the data?
          </Text>
          <Text variant="body2" style={{ textAlign: 'center' }}>
            Please check your answer before submit.
            After submit your answer can be edited again in profile.
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