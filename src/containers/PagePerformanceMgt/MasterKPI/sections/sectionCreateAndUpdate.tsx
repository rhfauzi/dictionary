/* eslint-disable no-use-before-define */
import { Checkbox, Col, Divider, Modal, Radio, RadioChangeEvent, Row, Typography } from 'antd'
import { Button, Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import DebounceSelect from 'src/components/DebounceSelect'
import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { useMasterKPIContext } from '../states'
import { ConfirmSubmit, ConfirmSubmitSuccess } from './alerts'
import moment from 'moment'

export default function SectionCreateAndUpdate() {
  const {
    state: { showModal, dataForm, confirm, disableButton },
    handler: { handleModal, handleDataForm, handleConfirm, handleDisableButton, handleModalStatus },
  } = useMasterKPIContext()

  const [inputField, setInputField] = useState<any>({
    description: '',
    kpi_condition: '',
    kpi_category: '',
    value_type: '',
    name: '',
    year: '',
  })
  const isModalCreate = showModal === 'create'

  useEffect(() => {
    handleDisableButton(
      typeof dataForm?.description === 'undefined' ||
        dataForm?.description === '' ||
        typeof dataForm?.kpi_condition === 'undefined' ||
        dataForm?.kpi_condition === '' ||
        typeof dataForm?.kpi_category === 'undefined' ||
        dataForm?.kpi_category === '' ||
        typeof dataForm?.value_type === 'undefined' ||
        dataForm?.value_type === '' ||
        typeof dataForm?.name === 'undefined' ||
        dataForm?.name === '',
    )
  }, [dataForm])

  useEffect(() => {
    if (isModalCreate) {
      handleDataForm({
        description: '',
        kpi_condition: 'increase',
        kpi_category: 'financial',
        value_type: 'average',
        name: '',
      })
      setInputField({
        description: '',
        kpi_condition: 'increase',
        kpi_category: 'financial',
        value_type: 'average',
        name: '',
      })
    } else {
      setInputField({
        description: dataForm?.description ?? null,
        kpi_condition: dataForm?.kpi_condition ?? null,
        kpi_category: dataForm?.kpi_category ?? null,
        value_type: dataForm?.value_type ?? null,
        name: dataForm?.name ?? null,
      })
    }
  }, [showModal])

  const handleValidation = (val: string, field: string) => {
    let regex = /[^a-z\d\-_\s]+/i
    if (field === 'id' || field === 'code' || field === 'grade') {
      // alphanumeric, -, no space
      regex = /[^0-9a-zA-Z\-_]+$/
    }
    const tes = val.match(regex)
    if (tes?.length <= 0 || tes === null) {
      setInputField({ ...inputField, [field]: val ?? '' })
      handleDataForm({ ...dataForm, [field]: val })
    }
  }

  const footer = (
    <Footer style={{ display: 'flex', gap: 10, marginBottom: '20px', justifyContent: 'flex-end' }}>
      {isModalCreate && (
        <Button
          size="big"
          variant="tertiary"
          className="hc-button-tertiary"
          style={{}}
          onClick={() => {
            handleModal(undefined)
            handleDataForm({})
          }}
        >
          Refresh Form
        </Button>
      )}

      <Button
        size="big"
        variant="primary"
        className="hc-button"
        style={{}}
        disabled={disableButton || !isModalCreate}
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
        <Typography.Title level={3} style={{ margin: 0 }}>
          {isModalCreate ? 'Set KPI' : `Set KPI ${moment().year(  )}`}
        </Typography.Title>
        <Spacer size={25} />
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <DebounceSelect
                  label="Key Performance Indicator"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="e.g GP 1 Margin Achievement"
                  value={inputField?.name ?? ''}
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
                  disabled={!isModalCreate}
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
        </Row>
        <Divider dashed style={{ margin: '20px 0px' }} />
        <div>
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Text variant="label" style={{ color: COLORS.grey.light }}>
                  Financial Category<span style={{ color: COLORS.red.regular }}>*</span>
                </Text>
                <Spacer size={10} />
                <Radio.Group
                  disabled={!isModalCreate}
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
              <Col span={12}>
                <Text variant="label" style={{ color: COLORS.grey.light }}>
                  Value Type<span style={{ color: COLORS.red.regular }}>*</span>
                </Text>
                <Spacer size={10} />
                <Radio.Group
                  disabled={!isModalCreate}
                  onChange={(e: RadioChangeEvent) => {
                    setInputField({ ...inputField, value_type: e?.target?.value ?? '' })
                    handleDataForm({ ...dataForm, value_type: e?.target?.value })
                  }}
                  value={inputField?.value_type}
                  style={{ fontWeight: 'normal' }}
                >
                  <Radio value={'average'}>Average</Radio>
                  <Radio value={'last value'}>Last Value</Radio>
                  <Radio value={'accumulation'}>Accumulation</Radio>
                  <Radio value={'maximum'}>Maximum</Radio>
                </Radio.Group>
              </Col>
            </Row>
          </Col>
          <Spacer size={30} />
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Text variant="label" style={{ color: COLORS.grey.light }}>
                  KPI Condition<span style={{ color: COLORS.red.regular }}>*</span>
                </Text>
                <Spacer size={10} />
                <Radio.Group
                  disabled={!isModalCreate}
                  onChange={(e: RadioChangeEvent) => {
                    setInputField({ ...inputField, kpi_condition: e?.target?.value ?? '' })
                    handleDataForm({ ...dataForm, kpi_condition: e?.target?.value })
                  }}
                  value={inputField?.kpi_condition}
                  style={{ fontWeight: 'normal' }}
                >
                  <Radio value={'increase'}>Increase</Radio>
                  <Radio value={'decrease'}>Decrease</Radio>
                  <Radio value={'equal'}>Equal</Radio>
                </Radio.Group>
              </Col>
            </Row>
          </Col>
        </div>

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
