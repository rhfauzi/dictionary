/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Col, Row, Modal, Typography, Switch } from 'antd'
import { Spacer, Button } from 'pink-lava-ui'
import DebounceSelect from 'src/components/DebounceSelect'
import styled from 'styled-components'
import { If, Then } from 'react-if'
import { useJobCodeContext } from '../states'
import { ConfirmSubmit, ConfirmSubmitSuccess } from './alerts'
import { getListSubJobFamily } from 'src/api/sub-job-family'

export default function SectionCreateAndUpdate() {
  const {
    state: {
      showModal,
      dataForm,
      confirm,
      disableButton,
      optJobTitle,
      optLegalEntity,
      optJobFamily,
      datasJobFamily,
      optSubJobfamily,
      optCountry,
      optJobGrade,
    },
    handler: {
      handleModal,
      handleDataForm,
      handleConfirm,
      handleDisableButton,
      handleDataOptSubJobFamily,
      handleModalStatus,
    },
  } = useJobCodeContext()

  const [loading, setLoading] = useState<any>(false)
  const [inputField, setInputField] = useState<any>({
    country_code: '',
    job_family_code: '',
    job_grade_id: 0,
    job_title_id: 0,
    legal_entity_code: '',
    sub_job_family_code: '',
  })
  const isModalCreate = showModal === 'create'

  useEffect(() => {
    handleDisableButton(
      typeof dataForm?.is_active === 'undefined' ||
        dataForm?.job_title_id === null ||
        typeof dataForm?.job_title_id === 'undefined' ||
        dataForm?.legal_entity_code === null ||
        typeof dataForm?.legal_entity_code === 'undefined' ||
        dataForm?.country_code === null ||
        typeof dataForm?.country_code === 'undefined' ||
        dataForm?.job_family_code === null ||
        typeof dataForm?.job_family_code === 'undefined' ||
        dataForm?.sub_job_family_code === null ||
        typeof dataForm?.sub_job_family_code === 'undefined' ||
        dataForm?.job_grade_id === null ||
        typeof dataForm?.job_grade_id === 'undefined',
    )
  }, [dataForm])

  useEffect(() => {
    if (isModalCreate) {
      handleDataForm({ ...dataForm, is_active: true })
      setInputField({
        job_title_id: null,
        legal_entity_code: null,
        country_code: null,
        job_family_code: null,
        sub_job_family_code: null,
        job_grade_id: null,
      })
    } else {
      setInputField({
        job_title_id: dataForm?.job_title_id ?? null,
        legal_entity_code: dataForm?.legal_entity_code ?? null,
        country_code: dataForm?.country_code ?? null,
        job_family_code: dataForm?.job_family_code ?? null,
        sub_job_family_code: dataForm?.sub_job_family_code ?? null,
        job_grade_id: dataForm?.job_grade_id ?? null,
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

  const filteredSubJobFamily = async () => {
    setLoading(true)
    const fltrSubJobFam = datasJobFamily.filter((sub) => sub.code === inputField?.job_family_code)
    await getListSubJobFamily({
      job_family_id: fltrSubJobFam[0]?.id ?? [],
      limit: '1000',
    })
      .then((res: any) => {
        if (res?.data) {
          let option = res?.data?.map((opt: any) => {
            return { value: opt?.code, label: opt?.name }
          })
          handleDataOptSubJobFamily(option ?? { data: [] })
        } else {
          handleDataOptSubJobFamily([])
        }
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    filteredSubJobFamily()
  }, [inputField.job_family_code])

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
        width={'50%'}
        onCancel={() => {
          handleModal(undefined)
          handleDataForm({})
          handleConfirm(undefined)
        }}
        footer={footer}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          {isModalCreate ? 'Create Job Code' : 'View Detail'}
        </Typography.Title>

        <Spacer size={10} />
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <DebounceSelect
              label="Job Title"
              disabled={!isModalCreate}
              required
              allowClear
              type="select"
              placeholder="Select"
              value={inputField?.job_title_id ?? null}
              options={optJobTitle}
              onChange={(e: any) => {
                setInputField({ ...inputField, job_title_id: e?.value ?? null })
                handleDataForm({ ...dataForm, job_title_id: e?.value ?? null })
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
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <DebounceSelect
                  label="Legal Entity Name"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="select"
                  placeholder="Select"
                  value={inputField?.legal_entity_code ?? null}
                  options={optLegalEntity}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, legal_entity_code: e?.value ?? null })
                    handleDataForm({ ...dataForm, legal_entity_code: e?.value ?? null })
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
                  label="Legal Entity ID"
                  disabled
                  required
                  allowClear
                  type="input"
                  placeholder="e.g XX"
                  value={inputField?.legal_entity_code ?? null}
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
                  label="Country Name"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="select"
                  placeholder="Select"
                  value={inputField?.country_code ?? null}
                  options={optCountry}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, country_code: e?.value ?? null })
                    handleDataForm({ ...dataForm, country_code: e?.value ?? null })
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
                  label="Country ID"
                  disabled
                  required
                  allowClear
                  type="input"
                  placeholder="e.g XX"
                  value={inputField?.country_code ?? undefined}
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
                  label="Job Family Name"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="select"
                  placeholder="Select"
                  value={inputField?.job_family_code ?? null}
                  options={optJobFamily}
                  onChange={(e: any) => {
                    console.log(e)
                    if (!e) {
                      setInputField({
                        ...inputField,
                        job_family_code: e?.value ?? null,
                        sub_job_family_code: null,
                      })
                      handleDataForm({ ...dataForm, job_family_code: e?.value ?? null })
                    } else {
                      setInputField({ ...inputField, job_family_code: e?.value ?? null })
                      handleDataForm({ ...dataForm, job_family_code: e?.value ?? null })
                    }
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
                  label="Job Family ID"
                  disabled
                  required
                  allowClear
                  type="input"
                  placeholder="e.g XX"
                  value={inputField?.job_family_code ?? undefined}
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
                  label="Sub Job Family Name"
                  required
                  allowClear
                  disabled={!isModalCreate || !inputField.job_family_code}
                  type="select"
                  placeholder="Select"
                  value={inputField?.sub_job_family_code ?? null}
                  options={optSubJobfamily}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, sub_job_family_code: e?.value ?? null })
                    handleDataForm({ ...dataForm, sub_job_family_code: e?.value ?? null })
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
                  label="Sub Job Family ID"
                  required
                  disabled
                  allowClear
                  type="input"
                  placeholder="e.g XX"
                  value={inputField?.sub_job_family_code ?? undefined}
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
                  label="Job Grade"
                  required
                  disabled={!isModalCreate}
                  allowClear
                  type="select"
                  placeholder="Select"
                  maxLength={50}
                  value={inputField?.job_grade_id ?? null}
                  options={optJobGrade}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, job_grade_id: e?.value ?? null })
                    handleDataForm({ ...dataForm, job_grade_id: e?.value ?? null })
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
                  label="Job Grade ID"
                  disabled
                  required
                  allowClear
                  type="input"
                  placeholder="e.g XX"
                  value={inputField?.job_grade_id}
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
