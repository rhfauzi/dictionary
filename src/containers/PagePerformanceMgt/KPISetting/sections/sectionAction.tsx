import React, { useState } from 'react'
import { Button, Spacer, Text, message } from 'pink-lava-ui'
import { Col, Row, Input, Popover } from 'antd'
import { Card } from 'src/components'
import {
  ICSearch,
  ICArrowLeft,
  ICHCArrowDownBlue,
  ICHCUploadTemplate,
  ICHCDownloadTemplate,
  ICHCFileXLSX,
} from 'src/assets'
import { useRouter } from 'next/router'
import { useKPISettingContext } from '../states'

export default function SectionAction() {
  const router = useRouter()
  const {
    state: { refetch },
    handler: { handleModal, handleFilters, handleReFetch, runProcess, stopProcess },
  } = useKPISettingContext()
  const [search, setSearch] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)

  const handleValidation = (val: any) => {
    const regex = /[^a-z\d\-_\s]+/i
    const tes = val.match(regex)
    if (tes?.length <= 0 || tes === null) {
      setSearch(val)
      handleFilters('search', val)
    }
  }

  return (
    <>
      <Spacer size={16} />
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row gutter={[10, 10]} justify="space-between">
          <Col md={16} sm={24} xs={24}>
            <Row align="middle">
              <ICArrowLeft
                onClick={() => router.push('/performance-management')}
                style={{ cursor: 'pointer' }}
              />
              <Text variant="headingLarge" style={{ fontWeight: 'bold', color: '#444444' }}>
                KPI Setting
              </Text>
            </Row>
          </Col>
          <Col md={8} sm={24} xs={24} style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              size="big"
              variant="primary"
              className="hc-button"
              onClick={() => {
                handleModal('create')
              }}
              style={{ marginRight: '20px', height: '36px' }}
            >
              Set New KPI
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  )
}
