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
import { useMasterKPIContext } from '../states'
import { downloadData, downloadTemplate, uploadTemplate } from 'src/api/master-kpi'

export default function SectionAction() {
  const router = useRouter()
  const {
    state: { refetch },
    handler: { handleModal, handleFilters, handleReFetch, runProcess, stopProcess },
  } = useMasterKPIContext()
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

  async function downloadDataAction() {
    try {
      const response: any = await downloadData()
      const url = window.URL.createObjectURL(response)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'master-kpi.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      stopProcess()
    }
  }

  async function downloadTemplateAction() {
    try {
      const response = await downloadTemplate()
      const url = window.URL.createObjectURL(response)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'template-job-code.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      const errorStatus = error?.response?.status
      const errorMessage = error?.response?.data?.message
      const detailedErrorMessage = error?.response?.data?.data?.message
      if (errorStatus === 401) {
        message.error(
          "Unauthorized. error permission. you don't have permission to access this resource",
        )
      } else if (detailedErrorMessage) {
        message.error(`${errorStatus} : ${detailedErrorMessage}`, 10)
      } else if (errorMessage) {
        message.error(`${errorStatus} : ${errorMessage}`, 10)
      } else {
        message.error('Something went wrong')
      }
      stopProcess()
    }
  }

  // async function uploadAction(data: any) {
  //   runProcess('Wait for upload template')
  //   try {
  //     const response = await uploadTemplate(data?.file)
  //     if (response?.status === 200) {
  //       const url = window.URL.createObjectURL(response?.data)
  //       const link = document.createElement('a')
  //       link.href = url
  //       link.setAttribute('download', 'job-code.xlsx')
  //       document.body.appendChild(link)
  //       link.click()
  //       document.body.removeChild(link)
  //     }
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  //   stopProcess()
  //   router.push(router.pathname)
  // }

  const moreContent = (
    <Row gutter={[10, 10]} style={{ fontWeight: 'bold', width: 200 }}>
      {/* <Col span={24} style={{ cursor: 'pointer' }}>
        <Row gutter={10} style={{ alignItems: 'center' }}>
          <Col>
            <ICHCUploadTemplate />
          </Col>
          <Col
            onClick={() => {
              setVisible(true)
              setShow(false)
            }}
            title={'Upload Template'}
          >
            {'Upload Template'}
          </Col>
        </Row>
      </Col> */}
      {/* <Col span={24} style={{ cursor: 'pointer' }}>
        <Row gutter={10} style={{ alignItems: 'center' }}>
          <Col>
            <ICHCDownloadTemplate />
          </Col>
          <Col onClick={() => downloadTemplateAction()} title={'Download Template'}>
            {'Download Template'}
          </Col>
        </Row>
      </Col> */}
      <Col span={24} style={{ cursor: 'pointer' }}>
        <Row gutter={10} style={{ alignItems: 'center' }}>
          <Col>
            <ICHCFileXLSX />
          </Col>
          <Col onClick={() => downloadDataAction()} title={'Download Data'}>
            {'Download Data'}
          </Col>
        </Row>
      </Col>
    </Row>
  )

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
                Master KPI
              </Text>
            </Row>
          </Col>
          <Col md={8} sm={24} xs={24} style={{ display: 'flex', justifyContent: 'end' }}>
            <Popover
              placement="bottom"
              content={moreContent}
              trigger="click"
              open={show}
              onOpenChange={setShow}
            >
              <Button
                size="big"
                variant="secondary"
                className="hc-button-export"
                style={{ gap: 5, marginRight: '20px' }}
              >
                More <ICHCArrowDownBlue />
              </Button>
            </Popover>
            <Button
              size="big"
              variant="primary"
              className="hc-button"
              onClick={() => {
                handleModal('create')
              }}
              style={{ marginRight: '20px', height: '36px' }}
            >
              Create
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  )
}
