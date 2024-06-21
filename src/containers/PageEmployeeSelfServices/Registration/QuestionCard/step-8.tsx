/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider, Radio } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import styled from 'styled-components'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'

export default function Step8({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    name: null,
    reading_proficiency: null,
    writing_proficiency: null,
    speaking_proficiency: null,
  })

  const [inputList, setInputList] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.language ?? [question])
  }, [])

  useEffect(() => {
    inputList?.forEach((item: any) => {
      setDisableButton(
        typeof item?.name === 'undefined'
        || item?.name === null
        || item?.name === ''
        || typeof item?.reading_proficiency === 'undefined'
        || item?.reading_proficiency === null
        || item?.reading_proficiency === ''
        || typeof item?.writing_proficiency === 'undefined'
        || item?.writing_proficiency === null
        || item?.writing_proficiency === ''
        || typeof item?.speaking_proficiency === 'undefined'
        || item?.speaking_proficiency === null
        || item?.speaking_proficiency === '',
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
              Language
            </Text>
            <Divider />
          </Col>

          {inputList.map((items: any, index: number) => (
          <>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Language'} required/>
                </Col>
                <Col xs={14} xl={14}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g English"
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
                  <Label text={'Reading Proficiency'} required/>
                </Col>
                <Col xs={19} xl={19}>
                  <Radio.Group
                    name="radiogroup"
                    value={items.reading_proficiency ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'reading_proficiency', e?.target?.value)
                    }}
                  >
                    <Radio value={'Basic'}>Basic</Radio>
                    <Radio value={'Intermediate'}>Intermediate</Radio>
                    <Radio value={'Advanced'}>Advanced</Radio>
                    <Radio value={'Proficiency'}>Proficiency</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Writing Proficiency'} required/>
                </Col>
                <Col xs={19} xl={19}>
                  <Radio.Group
                    name="radiogroup"
                    value={items.writing_proficiency ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'writing_proficiency', e?.target?.value)
                    }}
                  >
                    <Radio value={'Basic'}>Basic</Radio>
                    <Radio value={'Intermediate'}>Intermediate</Radio>
                    <Radio value={'Advanced'}>Advanced</Radio>
                    <Radio value={'Proficiency'}>Proficiency</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Speaking Proficiency'} required/>
                </Col>
                <Col xs={19} xl={19}>
                  <Radio.Group
                    name="radiogroup"
                    value={items.speaking_proficiency ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'speaking_proficiency', e?.target?.value)
                    }}
                  >
                    <Radio value={'Basic'}>Basic</Radio>
                    <Radio value={'Intermediate'}>Intermediate</Radio>
                    <Radio value={'Advanced'}>Advanced</Radio>
                    <Radio value={'Proficiency'}>Proficiency</Radio>
                  </Radio.Group>
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
          <ICPlusBlue /> Language
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { language: [...inputList] })
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