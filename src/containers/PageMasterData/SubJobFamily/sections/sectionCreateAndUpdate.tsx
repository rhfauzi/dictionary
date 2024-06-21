/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Typography, Switch, Input } from 'antd'
import { Spacer, Button, Text } from 'pink-lava-ui'

import styled from 'styled-components'
import { If, Then } from 'react-if'
import { useSubJobFamilyContext } from '../states'
import { ConfirmSubmit, ConfirmSubmitSuccess } from './alerts'
import DebounceSelect from 'src/components/DebounceSelect'

export default function SectionCreateAndUpdate() {
  const {
    state: { datas, showModal, dataForm, confirm, disableButton, optionJobFamily },
    handler: { handleModal, handleDataForm, handleConfirm, handleDisableButton },
  } = useSubJobFamilyContext()

  const [inputField, setInputField] = useState<any>({
    code: null,
    job_family_code: '',
    name: '',
    description: '',
  })
  const isModalCreate = showModal === 'create'

  useEffect(() => {
    handleDisableButton(
      typeof dataForm?.is_active === 'undefined' ||
        dataForm?.name === '' ||
        typeof dataForm?.name === 'undefined' ||
        dataForm?.description === '' ||
        typeof dataForm?.description === 'undefined' ||
        typeof dataForm?.code === 'undefined' ||
        dataForm?.code === '' ||
        typeof dataForm?.job_family_code === 'undefined' ||
        dataForm?.job_family_code === null,
    )
  }, [dataForm])

  useEffect(() => {
    if (isModalCreate) {
      handleDataForm({ ...dataForm, is_active: true })
      setInputField({ name: '', description: '', code: '', job_family_code: null })
    } else {
      setInputField({
        name: dataForm?.name ?? '',
        description: dataForm?.description ?? '',
        code: dataForm?.code ?? '',
        job_family_code: dataForm?.job_family_code ?? null,
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
    <Footer style={{ display: 'flex', gap: 10, marginBottom: '20px' }}>
      <Button
        size="big"
        variant="tertiary"
        className="hc-button-tertiary"
        style={{ flexGrow: 1 }}
        onClick={() => {
          handleModal(undefined)
          handleDataForm({})
        }}
      >
        Cancel
      </Button>

      <Button
        size="big"
        variant="primary"
        className="hc-button"
        style={{ flexGrow: 1 }}
        disabled={disableButton}
        onClick={() => {
          handleConfirm('confirm-submit')
        }}
      >
        Save
      </Button>
    </Footer>
  )

  return (
    <>
      <Modal
        zIndex={500}
        closable={true}
        open={showModal !== undefined}
        onCancel={() => {
          handleModal(undefined)
          handleDataForm({})
          handleConfirm(undefined)
        }}
        footer={footer}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          {isModalCreate ? 'Create Sub Job Family' : 'View Sub Job Family'}
        </Typography.Title>

        <Spacer size={10} />
        <Row gutter={[10, 10]} style={{ height: 500 }}>
          <Col span={24}>
            <DebounceSelect
              type="select"
              label="Job Family Name"
              allowClear={false}
              placeholder={'Select'}
              onChange={(item: any) => {
                setInputField({ ...inputField, job_family_code: item?.value })
                handleDataForm({ ...dataForm, job_family_code: item?.value ?? null })
              }}
              options={optionJobFamily}
              value={inputField?.job_family_code}
              style={{ width: '100%', height: '38px' }}
            />
          </Col>
          <Col span={24}>
            <DebounceSelect
              label="Job Family ID"
              disabled
              required
              allowClear
              type="input"
              placeholder="e.g XX"
              maxLength={50}
              value={inputField?.job_family_code ?? undefined}
              onChange={(e: any) => {
                setInputField({ ...inputField, job_family_code: e?.target?.value ?? '' })
                handleDataForm({ ...dataForm, job_family_code: e?.target?.value ?? '' })
              }}
              style={{
                width: '100%',
                height: '38px',
                fontSize: '14px',
                paddingTop: '4px',
              }}
            />
          </Col>
          <Col span={24}>
            <DebounceSelect
              label="Sub Job Family ID"
              required
              allowClear
              type="input"
              placeholder="e.g 001"
              maxLength={50}
              value={inputField?.code ?? ''}
              onChange={(e: any) => {
                setInputField({ ...inputField, code: e?.target?.value ?? '' })
                handleDataForm({ ...dataForm, code: e?.target?.value ?? '' })
              }}
              style={{ width: '100%', height: '38px' }}
            />
          </Col>
          <Col span={24}>
            <DebounceSelect
              label="Sub Job Family"
              required
              allowClear
              type="input"
              placeholder="e.g Learning & Development"
              maxLength={50}
              value={inputField?.name ?? ''}
              onChange={(e: any) => {
                handleValidation(e?.target?.value, 'name')
              }}
              style={{ width: '100%', height: '38px' }}
            />
          </Col>
          <Col span={24}>
            <DebounceSelect
              label="Description"
              required
              allowClear={false}
              type="textarea"
              placeholder="e.g C Level"
              value={inputField?.description ?? undefined}
              onChange={(e: any) => {
                setInputField({ ...inputField, description: e?.target?.value ?? '' })
                handleDataForm({ ...dataForm, description: e?.target?.value ?? '' })
              }}
              style={{ width: '100%', height: '100px' }}
            />
          </Col>

          <If condition={!isModalCreate}>
            <Then>
              <Col span={24}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Active/Inactive</div>
                <SwitchCustom>
                  <Switch
                    checked={dataForm?.is_active ?? undefined}
                    onChange={(e: boolean) => handleDataForm({ ...dataForm, is_active: e })}
                  />
                  {dataForm?.is_active ? ' Active' : ' Inactive'}
                </SwitchCustom>
              </Col>
            </Then>
          </If>
        </Row>

        {confirm === 'confirm-submit' && <ConfirmSubmit />}
        {confirm === 'success-submit' && <ConfirmSubmitSuccess />}
      </Modal>
    </>
  )
}

const SwitchCustom = styled.div`
  .ant-switch-checked {
    background: #2771c7 !important;
  }
  .ant-switch-checked .ant-switch-handle {
    left: calc(100% - 18px - 2px) !important;
  }
` as any

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
