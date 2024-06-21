/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider, DatePicker, Radio } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import styled from 'styled-components'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'
import { optionsRelationship } from './dataOptions'

export default function Step5({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    fullname: null,
    gender: null,
    relationship: null,
    date_of_birth: undefined,
    occupation: null,
    address: null,
  })
  const [inputList, setInputList] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.family ?? [question])
  }, [])

  useEffect(() => {
    inputList?.forEach((item: any) => {
      setDisableButton(
        typeof item?.fullname === 'undefined'
        || item?.fullname === null
        || item?.fullname === ''
        || typeof item?.gender === 'undefined'
        || item?.gender === null
        || item?.gender === ''
        || typeof item?.relationship === 'undefined'
        || item?.relationship === null
        || item?.relationship === ''
        || typeof item?.date_of_birth === 'undefined'
        || item?.date_of_birth === null
        || item?.date_of_birth === ''
        || typeof item?.occupation === 'undefined'
        || item?.occupation === null
        || item?.occupation === ''
        || typeof item?.address === 'undefined'
        || item?.address === null
        || item?.address === '',
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
              Family Member
            </Text>
            <Divider />
          </Col>

          {inputList.map((items: any, index: number) => (
          <>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Full Name'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g John Doe"
                    value={items.fullname ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'fullname', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Gender'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <Radio.Group
                    name="radiogroup"
                    value={items.gender ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'gender', e?.target?.value)
                    }}
                  >
                    <Radio value={'Male'}>Male</Radio>
                    <Radio value={'Female'}>Female</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Relationship'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    placeholder={'Select'}
                    type="select"
                    label=""
                    allowClear={false}
                    onChange={(item: any) => {
                      updateInputList(index, 'relationship', item?.value)
                    }}
                    options={optionsRelationship}
                    value={items.relationship}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Date of Birth'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    format={'DD-MM-YYYY'}
                    disabledDate={(current) => current.isAfter(moment())}
                    value={items.date_of_birth !== undefined && items.date_of_birth !== ''
                      ? moment(items.date_of_birth)
                      : undefined
                    }
                    onChange={(data: any) => {
                      const datas = data ? moment(data).format('YYYY-MM-DD') : undefined
                      updateInputList(index, 'date_of_birth', datas)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Occupation'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g Private Sector Employee"
                    value={items.occupation ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'occupation', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Address'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g Jl. Setiabudi No. 1"
                    value={items.address ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'address', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '88px', fontSize: '14px', paddingTop: '4px', textAlign: 'left' }}
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
          <ICPlusBlue /> Family Member
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { family: [...inputList] })
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