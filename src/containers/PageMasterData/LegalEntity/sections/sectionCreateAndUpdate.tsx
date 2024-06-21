/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Typography, Switch } from 'antd'
import { Spacer, Button } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import styled from 'styled-components'
import { If, Then } from 'react-if'
import { useLegalEntityContext } from '../states'
import { ConfirmSubmit, ConfirmSubmitSuccess } from './alerts'

export default function SectionCreateAndUpdate() {
  const {
    state: { showModal, dataForm, confirm, disableButton },
    handler: { handleModal, handleDataForm, handleConfirm, handleDisableButton, handleModalStatus },
  } = useLegalEntityContext()

  const [inputField, setInputField] = useState<any>({
    id: '',
    name: '',
  })
  const isModalCreate = showModal === 'create'

  useEffect(() => {
    handleDisableButton(
      dataForm?.id === ''
        || dataForm?.id === null
        || typeof dataForm?.id === 'undefined'
        || dataForm?.code === ''
        || dataForm?.code === null
        || typeof dataForm?.code === 'undefined'
        || dataForm?.name === ''
        || dataForm?.name === null
        || typeof dataForm?.name === 'undefined'
        || typeof dataForm?.is_active === 'undefined',
    )
  }, [dataForm])

  useEffect(() => {
    if (isModalCreate) {
      handleDataForm({ ...dataForm, is_active: true })
      setInputField({ id: '', code: '', name: '' })
    } else {
      setInputField({
        id: dataForm?.id ?? null,
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
        disabled={!isModalCreate}
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
          {isModalCreate ? 'Create Legal Entity' : 'View Legal Entity'}
        </Typography.Title>

        <Spacer size={10} />
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <DebounceSelect
              label="ID"
              required
              allowClear
              type="input"
              placeholder="e.g KS"
              maxLength={10}
              disabled={!isModalCreate}
              value={inputField?.code ?? undefined}
              onChange={(e: any) => {
                handleValidation(e?.target?.value, 'code')
              }}
              style={{ width: '100%', height: '38px' }}
            />
          </Col>
          <Col span={24}>
            <DebounceSelect
              label="Legal Entity Name"
              required
              allowClear
              type="input"
              placeholder="e.g KSNI"
              maxLength={50}
              disabled={!isModalCreate}
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
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Active/Inactive</div>
                <SwitchCustom>
                  <Switch
                    checked={dataForm?.is_active ?? undefined}
                    onChange={(e: boolean) => {
                      handleModal(undefined)
                      handleModalStatus(true)
                      handleDataForm({ ...dataForm, is_active: e })
                    }}
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
