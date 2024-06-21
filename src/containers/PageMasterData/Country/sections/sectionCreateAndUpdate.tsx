/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Typography, Switch } from 'antd'
import { Spacer, Button } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import styled from 'styled-components'
import { If, Then } from 'react-if'
import { useCountryContext } from '../states'
import { ConfirmSubmit, ConfirmSubmitSuccess } from './alerts'

export default function SectionCreateAndUpdate() {
  const {
    state: { showModal, dataForm, confirm, disableButton },
    handler: {
      handleModal,
      handleDataForm,
      handleConfirm,
      handleDisableButton,
    },
  } = useCountryContext()

  const [inputField, setInputField] = useState<any>({
    code: '',
    name: '',
  })
  const isModalCreate = showModal === 'create'

  useEffect(() => {
    handleDisableButton(
      dataForm?.code === '' || dataForm?.code === null || typeof dataForm?.code === 'undefined'
      || dataForm?.name === '' || dataForm?.name === null || typeof dataForm?.name === 'undefined'
      || typeof dataForm?.is_active === 'undefined',
    )
  }, [dataForm])

  useEffect(() => {
    if (isModalCreate) {
      handleDataForm({ ...dataForm, is_active: true })
      setInputField({ code: '', name: '' })
    } else {
      setInputField({
        code: dataForm?.code ?? null,
        name: dataForm?.name ?? '',
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
        className='hc-button-tertiary'
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
        className='hc-button'
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
          {isModalCreate ? 'Create Country' : 'View Country'}
        </Typography.Title>

        <Spacer size={10} />
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <DebounceSelect
              label="ID"
              required
              allowClear
              type="input"
              placeholder="e.g ID"
              maxLength={10}
              disabled={!isModalCreate}
              value={inputField?.code ?? undefined}
              onChange={(e: any) => {
                handleValidation(e?.target?.value?.toUpperCase() ?? undefined, 'code')
              }}
              style={{ width: '100%', height: '38px' }}
            />
          </Col>
          <Col span={24}>
            <DebounceSelect
              label="Country Name"
              required
              allowClear
              type="input"
              placeholder="e.g Indonesia"
              maxLength={50}
              value={inputField?.name ?? undefined}
              onChange={(e: any) => {
                setInputField({ ...inputField, name: e?.target?.value ?? '' })
                handleDataForm({ ...dataForm, name: e?.target?.value ?? '' })
              }}
              style={{ width: '100%', height: '38px' }}
            />
          </Col>

          <If condition={!isModalCreate}>
            <Then>
              <Col span={24}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  Active/Inactive
                </div>
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
.ant-switch-checked { background: #2771C7 !important }
.ant-switch-checked .ant-switch-handle { left: calc(100% - 18px - 2px) !important }
` as any

const Footer = styled.div`
.hc-button { background-color: #2771C7; border: 1px solid #2771C7 }
.hc-button: hover { background-color: #164b89; border: 1px solid #164b89 }
.hc-button: disabled { background-color: #DDDDDD; border: 1px solid #DDDDDD }
.hc-button-tertiary { background-color: #FFFFFF; border: 2px solid #2771C7; color: #2771C7 }
.hc-button-tertiary: hover { border: 2px solid #114480; color: #114480 }
.hc-button-tertiary: disabled { background-color: #DDDDDD; border: 2px solid #DDDDDD }
` as any