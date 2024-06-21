/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from 'react'
import { Card, Row, Col, Divider } from 'antd'
import { Spacer, Text, Button } from 'pink-lava-ui'
import styled from 'styled-components'
import DebounceSelect from 'src/components/DebounceSelect'
import { ICPlusBlue, ICTrashRed } from 'src/assets'

interface Props {
  onChangeDisableButton?: (val: boolean) => any
  setAllDataForm?: (val: any) => any
  allDataForm?: any
}

export default function Step3({ onChangeDisableButton, setAllDataForm, allDataForm = {} }: Props) {
  const { payload } = allDataForm
  const [inputList, setInputList] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleInputKey = useCallback((competency_detail: any) => {
    const dataInput = []
    for (let i = 0; i < payload?.proficiency_level; i++) {
      if (competency_detail[i]) {
        dataInput.push(competency_detail[i])
      } else {
        dataInput.push({ level: [{ key_behaviour: '', key_activities: '' }] })
      }
    }
    setInputList(dataInput)
  }, [])

  useEffect(() => {
    handleInputKey(payload?.competency_detail ?? [])
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    const disabledValue = []
    inputList.forEach((item: any) => {
      item.level.forEach((subItem: any) => {
        disabledValue.push(
          subItem?.key_activities === undefined ||
            subItem?.key_activities === null ||
            subItem?.key_activities === '',
        )
        disabledValue.push(
          subItem?.key_behaviour === undefined ||
            subItem?.key_behaviour === null ||
            subItem?.key_behaviour === '',
        )
      })
    })
    const hasTrue = disabledValue.includes(true)
    onChangeDisableButton(hasTrue)

    setAllDataForm(inputList)
  }, [inputList])

  const updateInputList = (
    newActivity: any,
    fieldName: string,
    index: number,
    subIndex: number,
  ) => {
    setInputList((prevInputList) => {
      const updatedInputList = [...prevInputList]
      updatedInputList[index] = {
        ...updatedInputList[index],
        level: updatedInputList[index].level.map((item: any, idx: number) =>
          idx === subIndex ? { ...item, [fieldName]: newActivity } : item,
        ),
      }
      return updatedInputList
    })
  }

  const removeInputList = (index: number, subIndex: number) => {
    setInputList((prevData) => {
      const updatedData = [...prevData]
      updatedData[index] = {
        ...updatedData[index],
        level: updatedData[index].level.filter((_: any, idx: number) => idx !== subIndex),
      }
      return updatedData
    })
  }

  return (
    <ComponentStep3>
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row gutter={[20, 20]}>
          <Col xs={8} xl={8}>
            <DebounceSelect
              disabled
              type="input"
              label="Competency Name"
              placeholder="e.g Complex Problem Solving"
              value={payload?.name ?? ''}
              style={{ width: '100%', height: '38px', paddingTop: '4px' }}
              labelStyle={{ fontSize: '14px' }}
            />
          </Col>
          <Col xs={16} xl={16}>
            <DebounceSelect
              disabled
              type="input"
              label="Competency Definition"
              placeholder="e.g The ability to analyze ambigious"
              value={payload?.definition}
              style={{ width: '100%', height: '38px', paddingTop: '4px' }}
              labelStyle={{ fontSize: '14px' }}
            />
          </Col>
        </Row>

        <Spacer size={20} />
        <Divider style={{ borderColor: '#DDDDDD' }} />
        {inputList?.map((item: any, index: number) => (
          <>
            <Row key={index} gutter={[20, 20]}>
              <Col xs={24} xl={24}>
                <Spacer size={20} />
                <Text
                  variant="headingRegular"
                  style={{ fontWeight: '600', color: '#444444', fontSize: '16px' }}
                >
                  Level {index + 1}
                </Text>
              </Col>

              {item?.level?.map((subItems: any, subIndex: number) => (
                <>
                  <Col xs={8} xl={8}>
                    <DebounceSelect
                      type="input"
                      label="Key Behaviour"
                      placeholder="Type here...."
                      allowClear={true}
                      value={subItems.key_behaviour ?? ''}
                      onChange={(e: any) => {
                        updateInputList(e?.target?.value, 'key_behaviour', index, subIndex)
                      }}
                      style={{ width: '100%', height: '38px', paddingTop: '4px', fontSize: '14px' }}
                      labelStyle={{ fontSize: '14px' }}
                    />
                  </Col>
                  <Col xs={13} xl={13}>
                    <DebounceSelect
                      required
                      type="input"
                      label="Key Activity"
                      placeholder="Type here...."
                      allowClear={true}
                      value={subItems.key_activities ?? ''}
                      onChange={(e: any) => {
                        updateInputList(e?.target?.value, 'key_activities', index, subIndex)
                      }}
                      style={{ width: '100%', height: '38px', paddingTop: '4px', fontSize: '14px' }}
                      labelStyle={{ fontSize: '14px' }}
                    />
                  </Col>
                  <Col xs={3} xl={3} style={{ display: 'flex', justifyContent: 'end' }}>
                    {item?.level?.length > 1 && (
                      <ButtonRemove
                        size="big"
                        variant="tertiary"
                        onClick={() => {
                          removeInputList(index, subIndex)
                        }}
                        style={{
                          margin: '27px 0px 0px 10px',
                          border: '2px solid #2771c7',
                          color: 'white',
                          background: '#2771c7',
                          minWidth: '65px',
                          width: '100%',
                        }}
                      >
                        <ICTrashRed />{' '}
                        <p style={{ display: windowWidth < 1184 ? 'none' : 'auto' }}>Remove</p>
                      </ButtonRemove>
                    )}
                  </Col>
                </>
              ))}

              <Col xs={24} xl={24}>
                <Row gutter={[20, 20]} justify="end">
                  <ButtonAdd
                    size="big"
                    variant="tertiary"
                    onClick={() => {
                      const newLevel = [...inputList]
                      newLevel[index].level.push({ key_behaviour: '', key_activities: '' })
                      setInputList(newLevel)
                    }}
                    style={{
                      margin: '0px 10px 0px 10px',
                      border: '2px solid #2771c7',
                      color: 'white',
                      background: '#2771c7',
                      minWidth: '105px',
                    }}
                  >
                    <ICPlusBlue /> Add
                  </ButtonAdd>
                </Row>
              </Col>
            </Row>
            <Spacer size={20} />
            <Divider style={{ borderColor: '#DDDDDD' }} />
          </>
        ))}
      </Card>
    </ComponentStep3>
  )
}

const ComponentStep3 = styled.div`` as any

const ButtonAdd = styled(Button)`
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