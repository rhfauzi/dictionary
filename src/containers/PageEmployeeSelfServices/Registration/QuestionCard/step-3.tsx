/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text } from 'pink-lava-ui'
import { Col, Row, Divider } from 'antd'
import { Card } from 'src/components'
import DebounceSelect from 'src/components/DebounceSelect'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'
import {
  optionsIdType,
  optionsTaxStatus,
} from './dataOptions'

export default function Step3({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    id_type: null,
    id_number: null,
    tax_status: null,
  })
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    setDisableButton(
      typeof question?.id_type === 'undefined'
      || question?.id_type === null
      || question?.id_type === ''
      || typeof question?.id_number === 'undefined'
      || question?.id_number === null
      || question?.id_number === ''
      || typeof question?.tax_status === 'undefined'
      || question?.tax_status === null
      || question?.tax_status === '',
    )
  }, [question])

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setQuestion({
      id_type: prevData?.id_type ?? null,
      id_number: prevData?.id_number ?? null,
      tax_status: prevData?.tax_status ?? null,
    })
  }, [])

  return (
    <>
      <Card style={{ borderRadius: 8, height: '627px' }}>
        <Row gutter={[20, 20]}>
          <Col xs={24} xl={24}>
            <Text variant="headingRegular" style={{ fontWeight: 'bold', color: '#164882' }}>
              ID and TAX Information
            </Text>
            <Divider />
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'ID Type'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  placeholder={'Select'}
                  type="select"
                  label=""
                  allowClear
                  onChange={(item: any) => {
                    setQuestion({ ...question, id_type: item?.value })
                  }}
                  options={optionsIdType}
                  value={question?.id_type}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'ID Number'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required
                  type="input"
                  placeholder="e.g 1234567890"
                  value={question.id_number ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, id_number: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Tax Status'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <div>
                  <DebounceSelect
                    placeholder={'Select'}
                    type="select"
                    label=""
                    allowClear
                    onChange={(item: any) => {
                      setQuestion({ ...question, tax_status: item?.value })
                    }}
                    options={optionsTaxStatus}
                    value={question?.tax_status}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, question)
        }}
      />
    </>
  )
}