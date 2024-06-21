/* eslint-disable no-use-before-define */
import { Checkbox, Col, Divider, Modal, Radio, RadioChangeEvent, Row, Typography } from 'antd'
import { CheckboxChangeEvent, CheckboxProps } from 'antd/lib/checkbox'
import moment from 'moment'
import { Button, Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import DebounceSelect from 'src/components/DebounceSelect'
import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { useKPISettingContext } from '../states'
import { ConfirmSubmit, ConfirmSubmitSuccess } from './alerts'

let monthOption = [
  { month: 'January', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'February', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'March', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'April', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'May', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'June', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'July', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'August', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'September', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'October', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'November', value: 0, id: 0, kpi_setting_id: 0 },
  { month: 'December', value: 0, id: 0, kpi_setting_id: 0 },
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

  const [inputField, setInputField] = useState<any>({
    description: '',
    details: [],
    kpi_condition: 'increase',
    kpi_category: 'financial',
    name: '',
    uom: '',
    value_type: 'average',
    weight: 0,
    year: moment().year(),
  })
  const [isMonthOption, setMonthOption] = useState<any>(months)
  const [checkedList, setCheckedList] = useState<any[]>([])
  const [isAccumulation, setAccumulation] = useState<any>(0)
  const isModalCreate = showModal === 'create'

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    handleDisableButton(
      typeof inputField?.description === 'undefined' ||
        inputField?.description === '' ||
        typeof inputField?.name === 'undefined' ||
        inputField?.name === '' ||
        typeof inputField?.kpi_condition === 'undefined' ||
        inputField?.kpi_condition === '' ||
        typeof inputField?.kpi_category === 'undefined' ||
        inputField?.kpi_category === '' ||
        typeof inputField?.uom === 'undefined' ||
        inputField?.uom === '' ||
        typeof inputField?.value_type === 'undefined' ||
        inputField?.value_type === '' ||
        typeof inputField?.weight === 'undefined' ||
        inputField?.weight === 0 ||
        typeof inputField?.year === 'undefined' ||
        inputField?.year === '',
    )
  }, [dataForm])

  useEffect(() => {
    if (isModalCreate) {
      handleDataForm({
        description: '',
        details: monthOption,
        kpi_condition: 'increase',
        kpi_category: 'financial',
        name: '',
        uom: '',
        value_type: 'average',
        weight: 0,
        year: moment().year(),
      })
      setInputField({
        description: '',
        details: [],
        kpi_condition: 'increase',
        kpi_category: 'financial',
        name: '',
        uom: '',
        value_type: 'average',
        weight: 0,
        year: moment().year(),
      })
    } else {
      let updatedData = dataForm?.details
        ?.filter((detail) => detail.value > 0)
        .map((month) => month)
      console.log('updatedData', updatedData)
      let defaultValue = dataForm?.details?.map((item) =>
        item.value !== 0 ? capitalizeFirstLetter(item.month) : null,
      )
      //coba

      //coba
      setCheckedList(defaultValue)
      setInputField({
        description: dataForm?.description ?? '',
        details: updatedData ?? [],
        kpi_condition: dataForm?.kpi_condition ?? '',
        kpi_category: dataForm?.kpi_category ?? '',
        name: dataForm?.name ?? '',
        uom: dataForm?.uom ?? '',
        value_type: dataForm?.value_type ?? '',
        weight: dataForm?.weight ?? '',
        year: dataForm?.year ?? moment().year(),
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
      setInputField({ ...inputField, [field]: field === 'weight' ? Number(val) : val ?? 0 })
      handleDataForm({ ...dataForm, [field]: field === 'weight' ? Number(val) : val ?? 0 })
    }
  }

  const indeterminate = checkedList.length > 0 && checkedList?.length < isMonthOption?.length
  const checkAll = isMonthOption?.length === checkedList?.length

  const onCheckAllChange: CheckboxProps['onChange'] = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? isMonthOption : [])
    setInputField({
      ...inputField,
      details: e.target.checked
        ? isMonthOption?.map((m) => ({ month: m, value: 0, id: 0, kpi_setting_id: 0 }))
        : [],
    })
  }

  const onChangeSingleCheck = (list: string[]) => {
    setCheckedList(list)
    setInputField((prevState) => {
      const newDetails = list.map((month) => {
        const existingDetail = prevState?.details?.find((detail) => detail.month === month)
        let dataDetail = null
        if (!isModalCreate) {
          dataDetail = dataForm.details.find((detail) => detail.month === month)
        }
        return {
          month,
          value: existingDetail ? existingDetail.value : 0,
          id: existingDetail ? existingDetail.id : !isModalCreate ? dataDetail.id : 0,
          kpi_setting_id: existingDetail
            ? existingDetail.kpi_setting_id
            : !isModalCreate
            ? dataDetail.kpi_setting_id
            : 0,
        }
      })
      return {
        ...prevState,
        details: newDetails,
      }
    })

    let data = isModalCreate ? monthOption : dataForm?.details
    const updatedDetails = data?.map((detail) => {
      if (!list.includes(detail.month)) {
        return { ...detail, value: 0 }
      }
      return detail
    })

    handleDataForm({ ...dataForm, details: updatedDetails })
  }

  const handleInputChange = (month: string, val: any) => {
    setInputField((prevState) => ({
      ...prevState,
      details: prevState.details.map((detail) =>
        detail.month === month ? { ...detail, value: Number(val) } : detail,
      ),
    }))
    handleDataForm({
      ...dataForm,
      details: dataForm?.details?.map((detail) =>
        detail.month === month ? { ...detail, value: Number(val) } : detail,
      ),
    })
  }

  const handleAccumulation = (type) => {
    switch (type) {
      case 'maximum':
        let maxValue = Math.max(...inputField?.details?.map((obj) => obj.value))
        setAccumulation(maxValue)
        break
      case 'average':
        let totalValue = inputField?.details?.reduce((sum, obj) => sum + obj.value, 0)
        let length = inputField?.details?.filter((item) => item.value > 0).length
        let average = totalValue / length
        setAccumulation(average)
        break
      case 'accumulation':
        let accumulateValue = inputField?.details?.reduce((sum, obj) => sum + obj.value, 0)
        setAccumulation(accumulateValue)
        break
      case 'last value':
        let lastValue = inputField?.details[inputField?.details?.length - 1]?.value
        setAccumulation(lastValue)
        break
      default:
        break
    }
  }

  const footer = (
    <Footer style={{ display: 'flex', gap: 10, marginBottom: '20px', justifyContent: 'flex-end' }}>
      <Button
        size="big"
        variant="tertiary"
        className="hc-button-tertiary"
        style={{}}
        onClick={() => {
          handleDataForm({})
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
          const data = isModalCreate ? monthOption : dataForm?.details
          const updateDetail = data?.map((detail) => {
            const update = inputField?.details?.find((u) => u.month === detail.month)
            return update ? { ...detail, ...update } : detail
          })
          handleDataForm({ ...dataForm, details: updateDetail })
        }}
      >
        {isModalCreate ? 'Save' : 'Update'}
      </Button>
    </Footer>
  )

  useEffect(() => {
    handleAccumulation(inputField?.value_type)
  }, [inputField])

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
        {/* <Col span={24}>
          <Row>
            <Col span={12}>
              <pre>inputField{JSON.stringify(inputField, undefined, 2)}</pre>
            </Col>
            <Col span={12}>
              <pre>dataForm{JSON.stringify(dataForm, undefined, 2)}</pre>
            </Col>
          </Row>
        </Col> */}
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
              <Col span={24}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginBottom: '8px',
                    width: 'fit-content',
                  }}
                >
                  Category KPI
                </Text>
                <Radio.Group
                  onChange={(e: RadioChangeEvent) => {
                    setInputField({ ...inputField, kpi_category: e?.target?.value ?? '' })
                    handleDataForm({ ...dataForm, kpi_category: e?.target?.value })
                  }}
                  value={inputField?.kpi_category}
                  style={{ fontWeight: 'normal' }}
                >
                  <Radio value={'financial'}>Financial</Radio>
                  <Radio value={'non financial'}>Non Financial</Radio>
                </Radio.Group>
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
        <CustomCheckbox.Group
          value={checkedList}
          // options={isMonthOption}
          style={{ width: '100%' }}
          onChange={onChangeSingleCheck}
        >
          <Row gutter={[10, 10]}>
            {isMonthOption?.map((item) => (
              <Col span={4}>
                <CustomCheckbox value={item} style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>
                  {item}
                </CustomCheckbox>
              </Col>
            ))}
          </Row>
        </CustomCheckbox.Group>
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
          <Row>
            {inputField?.details?.map((item, i) => (
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
                    {item?.month?.toUpperCase().slice(0, 3)}
                  </div>
                  <Spacer size={10} />
                  <Row style={{ display: 'flex', flex: 1, width: '100%' }}>
                    <Col span={24} style={{ padding: '0px 5px 0px 0px' }}>
                      <DebounceSelect
                        key={item?.month}
                        label={
                          <Text style={{ fontSize: '12px' }}>
                            Value<span style={{ color: COLORS.red.regular }}>*</span>
                          </Text>
                        }
                        allowClear
                        type="input"
                        placeholder="e.g 10"
                        value={item?.value ?? ''}
                        onChange={(e: any) => handleInputChange(item?.month, e?.target?.value)}
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
                  disabled
                  allowClear
                  type="number"
                  placeholder="e.g 10"
                  value={isAccumulation}
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
