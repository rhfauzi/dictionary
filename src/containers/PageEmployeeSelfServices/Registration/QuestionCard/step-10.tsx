/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider, DatePicker, Upload } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import styled from 'styled-components'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'

export default function Step10({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    name: null,
    institution: null,
    certification_number: null,
    issue_date: undefined,
    expiration_date: undefined,
    credential_id: null,
    credential_url: null,
  })
  const [inputList, setInputList] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.certification ?? [question])
  }, [])

  useEffect(() => {
    inputList?.forEach((item: any) => {
      setDisableButton(
        typeof item?.name === 'undefined'
        || item?.name === null
        || item?.name === ''
        || typeof item?.institution === 'undefined'
        || item?.institution === null
        || item?.institution === ''
        || typeof item?.certification_number === 'undefined'
        || item?.certification_number === null
        || item?.certification_number === ''
        || typeof item?.issue_date === 'undefined'
        || item?.issue_date === null
        || item?.issue_date === ''
        || typeof item?.expiration_date === 'undefined'
        || item?.expiration_date === null
        || item?.expiration_date === ''
        || typeof item?.credential_id === 'undefined'
        || item?.credential_id === null
        || item?.credential_id === '',
      )
    })
  }, [inputList])

  const updateInputList = (idxToUpdate: number, varName: string, newValue: any) => {
    const updatedList = inputList.map((item: any, index: number) => {
      if (index === idxToUpdate) {
        return { ...item, [varName]: newValue }
      }
      return item
    })
    setInputList(updatedList)
  }

  const removeInputList = (idxToRemove: number) => {
    const updatedList = inputList.filter((_: any, index: number) => index !== idxToRemove);
    setInputList(updatedList)
  }

  return (
    <>
      <Card style={{ borderRadius: 8, height: '627px', overflow: 'auto' }}>
        <Row gutter={[20, 20]}>
          <Col xs={24} xl={24}>
            <Text variant="headingRegular" style={{ fontWeight: 'bold', color: '#164882' }}>
              Certification
            </Text>
            <Divider />
          </Col>

          {inputList.map((items: any, index: number) => (
          <>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Certification Name'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g SAP"
                    value={items.name ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'name', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Institution'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g SAP"
                    value={items.institution ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'institution', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Certification Number'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g SAP123456789"
                    value={items.certification_number ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'certification_number', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Issue Date'} required/>
                </Col>
                <Col xs={20} xl={4}>
                  <DatePicker
                    placeholder='dd-mm-yyyy'
                    format={'DD-MM-YYYY'}
                    defaultValue={items.issue_date !== undefined && items.issue_date !== ''
                      ? moment(items.issue_date)
                      : undefined
                    }
                    onChange={(data: any) => {
                      const datas = data ? moment(data).format('YYYY-MM-DD') : undefined
                      updateInputList(index, 'issue_date', datas)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                  />
                </Col>
                <Col xs={20} xl={4}>
                  <Label text={'Expired Date'} required style={{ paddingLeft: '20px' }}/>
                </Col>
                <Col xs={20} xl={4}>
                  <DatePicker
                    placeholder='dd-mm-yyyy'
                    format={'DD-MM-YYYY'}
                    defaultValue={items.expiration_date !== undefined && items.expiration_date !== ''
                      ? moment(items.expiration_date)
                      : undefined
                    }
                    onChange={(data: any) => {
                      const datas = data ? moment(data).format('YYYY-MM-DD') : undefined
                      updateInputList(index, 'expiration_date', datas)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Credential ID'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g 12322921031"
                    value={items.credential_id ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'credential_id', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '50px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Credential Url'} />
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required={false}
                    type="input"
                    placeholder="e.g https://yourcredential.com/"
                    value={items.credential_url ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'credential_url', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '50px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              {index > 0
                && <ButtonRemove
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    removeInputList(index)
                  }}
                  style={{
                    margin: '0px 10px',
                    border: '2px solid #2771c7',
                    color: 'white',
                    background: '#2771c7',
                  }}
                >
                  <ICTrashRed /> Remove
                </ButtonRemove>
              }
              <Divider />
            </Col>
          </>
          ))}
        </Row>

        <ButtonAddEducation
          size="big"
          variant="tertiary"
          onClick={() => {
            setInputList([...inputList, question])
          }}
          style={{
            margin: '0px 10px',
            border: '2px solid #2771c7',
            color: 'white',
            background: '#2771c7',
          }}
        >
          <ICPlusBlue /> Certification
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { certification: [...inputList] })
        }}
      />
    </>
  )
}

const ButtonAddEducation = styled(Button)`
&& {
  background-color: #D4E4FC !important;
  border: 1px solid #D4E4FC !important;
  color: #2771C7 !important;
}
::hover { background-color: #164b89; border: 1px solid #164b89 }
` as any

const ButtonRemove = styled(Button)`
&& {
  background-color: white !important;
  border: 2px solid red !important;
  color: red !important;
}
` as any