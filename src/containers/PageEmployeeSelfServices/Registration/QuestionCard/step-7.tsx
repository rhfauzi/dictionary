/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import styled from 'styled-components'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'

export default function Step7({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    bank_name: null,
    account_number: null,
    account_holder: null,
  })
  const [inputList, setInputList] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.bank_account ?? [question])
  }, [])

  useEffect(() => {
    inputList?.forEach((item: any) => {
      setDisableButton(
        typeof item?.bank_name === 'undefined'
        || item?.bank_name === null
        || item?.bank_name === ''
        || typeof item?.account_number === 'undefined'
        || item?.account_number === null
        || item?.account_number === ''
        || typeof item?.account_holder === 'undefined'
        || item?.account_holder === null
        || item?.account_holder === '',
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
              Bank Account
            </Text>
            <Divider />
          </Col>

          {inputList.map((items: any, index: number) => (
          <>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Bank Name'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g Bank Mandiri"
                    value={items.bank_name ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'bank_name', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Account Number'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="number"
                    placeholder="e.g 13211111000"
                    value={items.account_number ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'account_number', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Account Name'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g John Doe"
                    value={items.account_holder ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'account_holder', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
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
          <ICPlusBlue /> Bank Account
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { bank_account: [...inputList] })
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