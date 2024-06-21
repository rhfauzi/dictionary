/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider, DatePicker } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import { getFieldOfStudy } from 'src/api/employee-self-service'
import moment from 'moment'
import styled from 'styled-components'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'
import { optionsLevel } from './dataOptions'

export default function Step4({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    name: null,
    major: null,
    field_of_study: null,
    level: null,
    start_year: null,
    finish_year: null,
    gpa: null,
  })
  const [inputList, setInputList] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.education ?? [question])
  }, [])

  useEffect(() => {
    inputList?.forEach((item: any) => {
      setDisableButton(
        typeof item?.name === 'undefined'
        || item?.name === null
        || item?.name === ''
        || typeof item?.major === 'undefined'
        || item?.major === null
        || item?.major === ''
        || typeof item?.field_of_study === 'undefined'
        || item?.field_of_study === null
        || item?.field_of_study === ''
        || typeof item?.level === 'undefined'
        || item?.level === null
        || item?.level === ''
        || typeof item?.start_year === 'undefined'
        || item?.start_year === null
        || item?.start_year === ''
        || typeof item?.finish_year === 'undefined'
        || item?.finish_year === null
        || item?.finish_year === ''
        || typeof item?.gpa === 'undefined'
        || item?.gpa === null
        || item?.gpa === '',
      )
    })
  }, [inputList])

  const updateInputList = (idxToUpdate: number, varName: string, newValue: any) => {
    const updatedList = inputList.map((item: any, index: number) => {
      if (varName === 'gpa') {
        if (index === idxToUpdate) {
          return { ...item, [varName]: Number(newValue) }
        }
      } else if (index === idxToUpdate) {
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
              Education Background
            </Text>
            <Divider />
          </Col>

          {inputList?.map((items: any, index: number) => (
          <>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'School Name'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g Universal University"
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
                  <Label text={'Major'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g Human Capital"
                    value={items.major ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'major', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Field of Study'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    placeholder={'Select'}
                    type="select"
                    label=""
                    allowClear={true}
                    onChange={(item: any) => {
                      updateInputList(index, 'field_of_study', item?.value)
                    }}
                    fetchOptions={(search) => getFieldOfStudy(search)}
                    value={items?.field_of_study}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Level'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <div>
                    <DebounceSelect
                      placeholder={'Select'}
                      type="select"
                      label=""
                      allowClear={false}
                      onChange={(item: any) => {
                        updateInputList(index, 'level', item?.value)
                      }}
                      options={optionsLevel}
                      value={items.level}
                      style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Start Year'} required/>
                </Col>
                <Col xs={20} xl={4}>
                  <DatePicker
                    picker="year"
                    disabledDate={(current) => current.isAfter(moment())}
                    value={items.start_year
                      ? moment(items.start_year, 'YYYY-MM-DD')
                      : undefined
                    }
                    onChange={(_: any, date: any) => {
                      updateInputList(index, 'start_year', date)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                  />
                </Col>
                <Col xs={20} xl={4}>
                  <Label text={'Finish Year'} required style={{ paddingLeft: '20px' }}/>
                </Col>
                <Col xs={20} xl={4}>
                  <DatePicker
                    picker="year"
                    value={items.finish_year
                      ? moment(items.finish_year, 'YYYY-MM-DD')
                      : undefined
                    }
                    onChange={(_: any, date: any) => {
                      updateInputList(index, 'finish_year', date)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'GPA'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="number"
                    placeholder="e.g 4.00"
                    value={Number(items.gpa) ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'gpa', e?.target?.value)
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
          <ICPlusBlue /> Education
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { education: [...inputList] })
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