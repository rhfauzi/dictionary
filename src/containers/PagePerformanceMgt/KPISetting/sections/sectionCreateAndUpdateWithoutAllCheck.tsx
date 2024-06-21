/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Typography, Divider, Checkbox, Radio, RadioChangeEvent } from 'antd'
import { Spacer, Button, Text } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import styled from 'styled-components'
import { If, Then } from 'react-if'
import { useKPISettingContext } from '../states'
import { ConfirmSubmit, ConfirmSubmitSuccess } from './alerts'
import { COLORS } from 'src/const/COLORS'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { CheckboxChangeEvent, CheckboxProps } from 'antd/lib/checkbox'
import { getListKPISettingById } from 'src/api/kpi-settings'
import moment from 'moment'

let monthOption = [
  { month: 'January', value: '' },
  { month: 'February', value: '' },
  { month: 'March', value: '' },
  { month: 'April', value: '' },
  { month: 'May', value: '' },
  { month: 'June', value: '' },
  { month: 'July', value: '' },
  { month: 'August', value: '' },
  { month: 'September', value: '' },
  { month: 'October', value: '' },
  { month: 'November', value: '' },
  { month: 'December', value: '' },
]
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function SectionCreateAndUpdate() {
  const {
    state: { showModal, dataForm, confirm, disableButton, filters },
    handler: { handleModal, handleDataForm, handleConfirm, handleDisableButton, handleModalStatus },
  } = useKPISettingContext()

  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(false)
  const [inputField, setInputField] = useState<any>({
    description: '',
    details: [],
    kpi_condition: 'increase',
    name: '',
    uom: '',
    value_type: 'average',
    weight: 0,
    year: '',
  })
  const [isMonthOption, setMonthOption] = useState<any>(monthOption)
  const [checkedList, setCheckedList] = useState<any[]>([])
  const isModalCreate = showModal === 'create'

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    handleDisableButton(
      typeof dataForm?.description === 'undefined' ||
        dataForm?.description === '' ||
        typeof dataForm?.name === 'undefined' ||
        dataForm?.name === '' ||
        typeof dataForm?.kpi_condition === 'undefined' ||
        dataForm?.kpi_condition === '' ||
        typeof dataForm?.uom === 'undefined' ||
        dataForm?.uom === '' ||
        typeof dataForm?.value_type === 'undefined' ||
        dataForm?.value_type === '' ||
        typeof dataForm?.weight === 'undefined' ||
        dataForm?.weight === 0 ||
        typeof dataForm?.year === 'undefined' ||
        dataForm?.year === '',
    )
  }, [dataForm])

  useEffect(() => {
    if (isModalCreate) {
      handleDataForm({ ...dataForm, kpi_condition: 'increase', value_type: 'average' })
      setInputField({
        description: '',
        details: [],
        kpi_condition: 'increase',
        name: '',
        uom: '',
        value_type: 'average',
        weight: '',
        year: '',
      })
    } else {
      let defaultValue = dataForm?.details?.map((item) => capitalizeFirstLetter(item.month))
      let adjsFormDetail = dataForm?.details?.map((item) => ({
        id: item?.id,
        month: item?.month,
        value: item?.value,
      }))
      console.log('defaultValue', defaultValue)
      setCheckedList(defaultValue)
      setIndeterminate(!!defaultValue.length || defaultValue.length < months.length)
      setInputField({
        description: dataForm?.description ?? '',
        details: adjsFormDetail ?? [],
        kpi_condition: dataForm?.kpi_condition ?? '',
        name: dataForm?.name ?? '',
        uom: dataForm?.uom ?? '',
        value_type: dataForm?.value_type ?? '',
        weight: dataForm?.weight ?? '',
        year: dataForm?.year ?? '',
      })
    }
  }, [showModal])

  const handleValidation = (val: string, field: string) => {
    let regex = /[^a-z\d\-_\s]+/i
    if (field === 'weight' || field === 'code' || field === 'grade') {
      // alphanumeric, -, no space
      regex = /[^0-9a-zA-Z\-_]+$/
    }
    const tes = val.match(regex)
    if (tes?.length <= 0 || tes === null) {
      setInputField({ ...inputField, [field]: val ?? '' })
      handleDataForm({ ...dataForm, [field]: field === 'weight' ? Number(val) : val })
    }
  }

  const onCheckAllChange: CheckboxProps['onChange'] = (e: CheckboxChangeEvent) => {
    console.log(e)
    console.log('list by all checkbox', isMonthOption)
    setCheckedList(e.target.checked ? isMonthOption : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)

    setInputField({
      ...inputField,
      details: e.target.checked ? months?.map((m) => ({ month: m, value: '' })) : [],
    })
  }
  const onChangeSingleCheck = (list: any[]) => {
    console.log('list by single checkbox', list)
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < months.length)
    setCheckAll(list.length === months.length)
  }

  const handleInputChange = (month: string, val: any) => {
    const updatedDetails = checkedList.map((item) =>
      item.month.includes(month) ? { ...item, value: val } : item,
    )

    setCheckedList((prevState) =>
      prevState.map((m) => (m.month === month ? { ...m, value: val } : m)),
    )

    // setMonthOption({ ...isMonthOption, details: updatedDetails })
    // setMonthOption({ ...isMonthOption, details: updatedDetails })
    handleDataForm({ ...dataForm, details: updatedDetails })
  }
  // const onCheckAllChange = (e: CheckboxChangeEvent) => {
  //   console.log(e)
  //   setCheckedList(e.target.checked ? months : [])
  //   setIndeterminate(false)
  //   setCheckAll(e.target.checked)

  //   setInputField({
  //     ...inputField,
  //     details: e.target.checked ? months?.map((m) => ({ month: m, value: '' })) : [],
  //   })
  //   handleDataForm({
  //     ...dataForm,
  //     details: e.target.checked ? months?.map((m) => ({ month: m, value: '' })) : [],
  //   })
  // }

  // const onChangeSingleCheck = (list: string[]) => {
  //   console.log(list)
  //   setCheckedList(list)
  //   setIndeterminate(!!list.length && list.length < months.length)
  //   setCheckAll(list.length === months.length)

  //   const newData = list?.map((m) => ({ month: m }))
  //   const uniqueNewData = newData.filter(
  //     (newItem) => !inputField.details.some((existingItem) => existingItem.month === newItem.month),
  //   )

  //   console.log('newData', newData)
  //   console.log('inputField.details', inputField.details)

  //   setInputField({
  //     ...inputField,
  //     details: [...inputField.details, ...uniqueNewData],
  //   })
  //   handleDataForm({ ...dataForm, details: [...inputField.details, ...uniqueNewData] })
  // }

  // const handleInputChange = (index: string, e: any) => {
  //   const updatedDetails = inputField?.details?.map((item) =>
  //     item.month.includes(index) ? { ...item, value: e.target.value } : item,
  //   )
  //   setInputField({ ...inputField, details: updatedDetails })
  //   handleDataForm({ ...dataForm, details: updatedDetails })
  // }

  useEffect(() => {
    console.log('first')
    console.log('checkedList', checkedList)
  }, [checkedList])

  const footer = (
    <Footer style={{ display: 'flex', gap: 10, marginBottom: '20px', justifyContent: 'flex-end' }}>
      <Button
        size="big"
        variant="tertiary"
        className="hc-button-tertiary"
        style={{}}
        onClick={() => {
          handleDataForm({})
          setCheckAll(false)
          setCheckedList([])
          setInputField({
            description: '',
            details: [],
            kpi_condition: 'increase',
            name: '',
            uom: '',
            value_type: 'average',
            weight: '',
            year: '',
          })
        }}
      >
        Refresh Form
      </Button>

      <Button
        size="big"
        variant="primary"
        className="hc-button"
        style={{}}
        disabled={disableButton}
        onClick={() => {
          handleConfirm('confirm-submit')
        }}
      >
        {isModalCreate ? 'Save' : 'Update'}
      </Button>
    </Footer>
  )

  return (
    <>
      <Modal
        zIndex={500}
        closable={true}
        open={showModal !== undefined}
        width={'65%'}
        onCancel={() => {
          handleModal(undefined)
          handleDataForm({})
          handleConfirm(undefined)
        }}
        footer={footer}
      >
        <pre>checkedList{JSON.stringify(checkedList, undefined, 2)}</pre>
        <pre>isMonthOption{JSON.stringify(isMonthOption, undefined, 2)}</pre>
        <pre>inputField{JSON.stringify(inputField, undefined, 2)}</pre>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {isModalCreate ? `KPI Setting ${moment().year()}` : `View Details`}
        </Typography.Title>
        <Spacer size={25} />
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <DebounceSelect
                  label="Key Performance Indicator"
                  // disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="e.g GP 1 Margin Achievement"
                  value={inputField?.name ?? null}
                  onChange={(e: any) => handleValidation(e?.target?.value, 'name')}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
              <Col span={12}>
                <DebounceSelect
                  label="Description"
                  // disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="e.g Rasio gross terhadap pencapaian net sales"
                  value={inputField?.description ?? null}
                  onChange={(e: any) => handleValidation(e?.target?.value, 'description')}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <DebounceSelect
                  label="UOM"
                  // disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="e.g %"
                  value={inputField?.uom ?? null}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, uom: e?.target?.value ?? '' })
                    handleDataForm({ ...dataForm, uom: e?.target?.value ?? '' })
                  }}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
              <Col span={12}>
                <DebounceSelect
                  label="Yearly Weight (%)"
                  // disabled={!isModalCreate}
                  required
                  allowClear
                  type="number"
                  placeholder="e.g 100"
                  value={inputField?.weight ?? null}
                  onChange={(e: any) => handleValidation(e?.target?.value, 'weight')}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider dashed style={{ margin: '20px 0px' }} />
        {/* Checklist month */}
        <Text
          variant="headingLarge"
          style={{
            fontWeight: 'bold',
            fontSize: '1rem',
            color: `${COLORS.blue.regular}`,
          }}
        >
          Select Month
        </Text>
        <CustomCheckbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </CustomCheckbox>
        <Spacer size={10} />
        {/* <CustomCheckbox.Group options={isMonthOption} value={checkedList} onChange={onChangeSingleCheck} /> */}
        <CustomCheckbox.Group
          value={checkedList}
          style={{ width: '100%' }}
          onChange={onChangeSingleCheck}
        >
          <Row gutter={[10, 10]}>
            {isMonthOption?.map((item) => (
              <Col span={4}>
                <CustomCheckbox value={item} style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>
                  {item?.month}
                </CustomCheckbox>
              </Col>
            ))}
          </Row>
        </CustomCheckbox.Group>
        {/* <CustomCheckbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </CustomCheckbox>
        <Spacer size={10} />
        <CustomCheckbox.Group
          // value={checkedList}
          // options={monthOption}
          style={{ width: '100%' }}
          onChange={onChangeSingleCheck}
        >
          <Row gutter={[10, 10]}>
            {monthOption?.map((month) => (
              <Col span={4}>
                <CustomCheckbox value={month} defaultChecked={true} style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>
                  {month.label}
                </CustomCheckbox>
              </Col>
            ))}
          </Row>
        </CustomCheckbox.Group> */}
        <Divider dashed style={{ margin: '20px 0px' }} />
        <Col span={24}>
          <Row>
            <Col span={12}>
              <Text variant="label" style={{ color: COLORS.grey.light }}>
                Value Type<span style={{ color: COLORS.red.regular }}>*</span>
              </Text>
              <Spacer size={10} />
              <Radio.Group
                value={inputField?.value_type}
                onChange={(e: RadioChangeEvent) => {
                  setInputField({ ...inputField, value_type: e?.target?.value ?? '' })
                  handleDataForm({ ...dataForm, value_type: e?.target?.value })
                }}
                style={{ fontWeight: 'normal' }}
              >
                <Radio value={'average'}>Average</Radio>
                <Radio value={'last value'}>Last Value</Radio>
                <Radio value={'accumulation'}>Accumulation</Radio>
                <Radio value={'maximum'}>Maximum</Radio>
              </Radio.Group>
            </Col>
            <Col span={12}>
              <Text variant="label" style={{ color: COLORS.grey.light }}>
                KPI Condition<span style={{ color: COLORS.red.regular }}>*</span>
              </Text>
              <Spacer size={10} />
              <Radio.Group
                value={inputField?.kpi_condition}
                onChange={(e: RadioChangeEvent) => {
                  setInputField({ ...inputField, kpi_condition: e?.target?.value ?? '' })
                  handleDataForm({ ...dataForm, kpi_condition: e?.target?.value })
                }}
                style={{ fontWeight: 'normal' }}
              >
                <Radio value={'increase'}>Increase</Radio>
                <Radio value={'decrease'}>Decrease</Radio>
                <Radio value={'equal'}>Equal</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
        <Divider dashed style={{ margin: '20px 0px' }} />
        <div style={{ width: '100%' }}>
          <Text style={{ color: COLORS.blue.regular }}>Monthly Target Setting</Text>
          <Spacer size={10} />
          {/* monthly section */}
          {/* {inputField?.details?.map(({ month, value }, i) => ( */}
          <Row>
            {/* {checkedList?.map(({ month, value }, i) => ( */}
            {checkedList?.map(({ month, value }, i) => (
              <Col span={6}>
                <Row key={i} style={{ marginBottom: '0.5rem' }} justify="center" align="middle">
                  <div
                    style={{
                      display: 'flex',
                      width: '2.5rem',
                      height: '2.5rem',
                      background: COLORS.blue.lightest,
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: 11,
                      color: COLORS.blue.regular,
                      fontWeight: 'bold',
                      borderRadius: '2.5rem',
                    }}
                  >
                    {month?.toUpperCase().slice(0, 3)}
                  </div>
                  <Spacer size={10} />
                  <Row style={{ display: 'flex', flex: 1, width: '100%' }}>
                    <Col span={24} style={{ padding: '0px 5px 0px 0px' }}>
                      <DebounceSelect
                        key={month}
                        label={
                          <Text style={{ fontSize: '12px' }}>
                            Value<span style={{ color: COLORS.red.regular }}>*</span>
                          </Text>
                        }
                        disabled={!isModalCreate}
                        allowClear
                        type="input"
                        placeholder="e.g 10"
                        value={value ?? ''}
                        onChange={(e: any) => handleInputChange(month, e?.target?.value)}
                        style={{
                          width: '100%',
                          height: '38px',
                          fontSize: '14px',
                          paddingTop: '4px',
                        }}
                      />
                    </Col>
                  </Row>
                </Row>
              </Col>
            ))}
          </Row>
        </div>
        <Divider dashed style={{ margin: '20px 0px' }} />
        {/* yearly section */}
        <div style={{ width: '100%' }}>
          <Text style={{ color: COLORS.blue.regular }}>Yearly Target Setting</Text>
          <Spacer size={10} />
          <Row justify={'center'} align={'middle'}>
            <div
              style={{
                display: 'flex',
                width: '2.5rem',
                height: '2.5rem',
                background: COLORS.blue.lightest,
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 11,
                color: COLORS.blue.regular,
                fontWeight: 'bold',
                borderRadius: '2.5rem',
              }}
            >
              {moment().year()}
            </div>
            <Spacer size={10} />
            <Row style={{ display: 'flex', flex: 1 }}>
              <Col span={12} style={{ padding: '0px 5px 0px 0px' }}>
                <DebounceSelect
                  label={
                    <Text style={{ fontSize: '12px' }}>
                      Value<span style={{ color: COLORS.red.regular }}>*</span>
                    </Text>
                  }
                  disabled={!isModalCreate}
                  allowClear
                  type="input"
                  placeholder="e.g 10"
                  value={inputField?.year ?? ''}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, year: e?.target?.value ?? null })
                    handleDataForm({ ...dataForm, year: e?.target?.value ?? null })
                  }}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
            </Row>
          </Row>
        </div>
        {/* Radio Button */}

        {confirm === 'confirm-submit' && <ConfirmSubmit />}
        {confirm === 'success-submit' && <ConfirmSubmitSuccess />}
      </Modal>
    </>
  )
}

const Footer = styled.div`
  .hc-button {
    background-color: #2771c7;
    border: 1px solid #2771c7;
  }
  .hc-button: hover {
    background-color: #164b89;
    border: 1px solid #164b89;
  }
  .hc-button: disabled {
    background-color: #dddddd;
    border: 1px solid #dddddd;
  }
  .hc-button-tertiary {
    background-color: #ffffff;
    border: 2px solid #2771c7;
    color: #2771c7;
  }
  .hc-button-tertiary: hover {
    border: 2px solid #114480;
    color: #114480;
  }
  .hc-button-tertiary: disabled {
    background-color: #dddddd;
    border: 2px solid #dddddd;
  }
` as any

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-inner::after {
    background-color: ${COLORS.blue.regular} !important;
  }
`
