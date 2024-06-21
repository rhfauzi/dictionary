/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider, DatePicker } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import styled from 'styled-components'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'

export default function Step6({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    title: null,
    company_name: null,
    department_name: null,
    start_date: undefined,
    end_date: undefined,
  })
  const [inputList, setInputList] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.working_experience ?? [question])
  }, [])

  useEffect(() => {
    inputList?.forEach((item: any) => {
      setDisableButton(
        typeof item?.title === 'undefined'
        || item?.title === null
        || item?.title === ''
        || typeof item?.company_name === 'undefined'
        || item?.company_name === null
        || item?.company_name === ''
        || typeof item?.department_name === 'undefined'
        || item?.department_name === null
        || item?.department_name === ''
        || typeof item?.start_date === 'undefined'
        || item?.start_date === null
        || item?.start_date === ''
        || typeof item?.end_date === 'undefined'
        || item?.end_date === null
        || item?.end_date === '',
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
              Working Experience
            </Text>
            <Divider />
          </Col>

          {inputList.map((items: any, index: number) => (
          <>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Position/Title'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g Manager"
                    value={items.title ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'title', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Company Name'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g PT. Kaldu Sari Nabati Indonesia"
                    value={items.company_name ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'company_name', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Department Name'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g Human Capital"
                    value={items.department_name ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'department_name', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Start Date'} required/>
                </Col>
                <Col xs={19} xl={4}>
                  <DatePicker
                    placeholder='dd-mm-yyyy'
                    format={'DD-MM-YYYY'}
                    disabledDate={(current) => current.isAfter(moment())}
                    value={items?.start_date !== undefined && items?.start_date !== ''
                      ? moment(items?.start_date)
                      : undefined
                    }
                    onChange={(data: any) => {
                      const datas = data ? moment(data).format('YYYY-MM-DD') : undefined
                      updateInputList(index, 'start_date', datas)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                  />
                </Col>
                <Col xs={4} xl={4}>
                  <Label text={'Finish Date'} required style={{ paddingLeft: '20px' }}/>
                </Col>
                <Col xs={19} xl={4}>
                  <DatePicker
                    placeholder='dd-mm-yyyy'
                    format={'DD-MM-YYYY'}
                    value={items.end_date !== undefined && items.end_date !== ''
                      ? moment(items.end_date)
                      : undefined
                    }
                    onChange={(data: any) => {
                      const datas = data ? moment(data).format('YYYY-MM-DD') : undefined
                      updateInputList(index, 'end_date', datas)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
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
          <ICPlusBlue /> Working Experience
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { working_experience: [...inputList] })
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