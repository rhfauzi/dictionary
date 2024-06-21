/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider, Select, Input } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed, ICArrowDown } from 'src/assets'
import styled from 'styled-components'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'
import { optionsSocialMedia } from './dataOptions'

export default function Step13({
  questionStep = 1,
  handleChange,
}) {
  const [inputList, setInputList] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    const isInputEmpty = inputList?.filter((item: any, index: number) => {
      if (index === 0) {
        return item.type === 'Linkedin' && item.url === ''
      }
      return false
    })
    if (isInputEmpty.length > 0) {
      setDisableButton(true)
    } else {
      setDisableButton(false)
    }
  }, [inputList])

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.social_media ?? [{
      url: '',
      type: 'Linkedin',
    }])
  }, [])

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
    const updatedList = inputList.filter((_: any, index: number) => index !== idxToRemove)
    setInputList(updatedList)
  }

  return (
    <>
      <Card style={{ borderRadius: 8, height: '627px', overflow: 'auto' }}>
        <Row gutter={[20, 20]}>
          <Col xs={24} xl={24}>
            <Text variant="headingRegular" style={{ fontWeight: 'bold', color: '#164882' }}>
              Social Media
            </Text>
            <Divider />
          </Col>

          {inputList.map((items: any, index: number) => (
            <>
              <Col xs={24} xl={24}>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                  <Col xs={5} xl={5}>
                    <Label text={'Social Media Name'} required={index === 0} />
                  </Col>
                  <Col xs={12} xl={12}>
                    <InputSocial
                      addonBefore={
                        <SelectBefore
                          disabled={index === 0}
                          defaultValue="Facebook"
                          value={items?.type}
                          className="select-before"
                          options={optionsSocialMedia}
                          suffixIcon={<ICArrowDown />}
                          onChange={(item: any) => {
                            updateInputList(index, 'type', item)
                          }}
                        />
                      }
                      onChange={(e: any) => {
                        updateInputList(index, 'url', e?.target?.value)
                      }}
                      value={items?.url}
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} xl={24}>
                {index > 0 && (
                  <ButtonRemove
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
                )}
                <Divider />
              </Col>
            </>
          ))}
        </Row>

        <ButtonAddEducation
          size="big"
          variant="tertiary"
          onClick={() => {
            setInputList([...inputList, {
              url: '',
              type: 'Facebook',
            }])
          }}
          style={{
            margin: '0px 10px',
            border: '2px solid #2771c7',
            color: 'white',
            background: '#2771c7',
          }}
        >
          <ICPlusBlue /> Other Social Media
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { social_media: [...inputList] })
          if (name === 'next') {
            handleChange(name, 13, { social_media: [...inputList] })
          } else {
            handleChange(name, step, { social_media: [...inputList] })
          }
        }}
      />
    </>
  )
}

const ButtonAddEducation = styled(Button)`
  && {
    background-color: #d4e4fc !important;
    border: 1px solid #d4e4fc !important;
    color: #2771c7 !important;
  }
  ::hover {
    background-color: #164b89;
    border: 1px solid #164b89;
  }
` as any

const ButtonRemove = styled(Button)`
  && {
    background-color: white !important;
    border: 2px solid red !important;
    color: red !important;
  }
` as any

const SelectBefore = styled(Select)`
  background: white;
  border: 1px solid rgb(170, 170, 170);
  height: 38px;
  border-radius: 8px 0px 0px 8px;
` as any

const InputSocial = styled(Input)`
  background: white;
  width: 100%;

  .ant-input-group-addon
    .ant-select.ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector {
    border: 0px solid transparent !important;
  }

  .ant-select-selection-item {
    padding-top: 3px !important;
  }
  .ant-input-group-addon {
    border: 0px solid white !important;
  }
  .ant-input {
    border: 1px solid rgb(170, 170, 170);
    height: 38px;
    border-radius: 0px 8px 8px 0px;
  }
  .ant-input-group-addon .ant-select {
    width: 125px;
    text-align: left;
  }
` as any