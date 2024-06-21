import React from 'react'
import { Modal } from 'antd'
import { useRouter } from 'next/router'
import { Button, Text } from 'pink-lava-ui'
import { ILHCThankYou } from 'src/assets/ilustration'
import styled from 'styled-components'

interface PropsDatepicker {
  open?: boolean
  onClose?: () => void
  closable?: boolean
  maskClosable?: boolean
}

export default function SectionCreateAndUpdate({
  open,
  onClose,
  closable = true,
  maskClosable = true,
  ...props
}: PropsDatepicker) {
  const router = useRouter()

  const footer = (
    <div style={{ display: 'flex', gap: 10, margin: '10px 0px' }}>
      <Button
        size="big"
        variant="tertiary"
        onClick={() => {
          onClose()
          router.push('/organization-development/job-analysis-and-evaluation')
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
            <ILHCThankYou />
          </div>
          <Text variant="headingRegular" style={{ textAlign: 'center' }}>
            Your job analysis has been succesfully submitted
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