/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Skeleton } from 'antd'
import { Spacer } from 'pink-lava-ui'
import styled from 'styled-components'
import DebounceSelect from 'src/components/DebounceSelect'
import DebounceSelectSearch from 'src/components/DebounceSelect3'
import {
  getCountry,
  getLegalEntity,
  getJobFamily,
  getSubJobFamily,
  getJobTitle,
} from 'src/api/competency-dictionary/behaviour-competency'

const optionsProficiencyLevel = [
  { id: 0, label: 1, value: 1 },
  { id: 1, label: 2, value: 2 },
  { id: 2, label: 3, value: 3 },
  { id: 3, label: 4, value: 4 },
  { id: 4, label: 5, value: 5 },
]

interface Props {
  onChangeDisableButton?: (val: boolean) => any
  setAllDataForm?: (val: any) => any
  type?: string
  allDataForm?: any
  isLoading?: boolean
}

export default function Step2({
  onChangeDisableButton,
  setAllDataForm,
  type = 'create',
  allDataForm = {},
  isLoading = false,
}: Props) {
  const { payload } = allDataForm
  const [datasCountry, setDatasCountry] = useState([])
  const [dataLegalEntiy, setDatasLegalEntiy] = useState([])
  const [dataJobFamily, setDatasJobFamily] = useState([])
  const [dataSubJobFamily, setDatasSubJobFamily] = useState([])
  const [dataJobTitle, setDatasJobTitle] = useState([])
  const [jobFamilyId, setJobFamilyId] = useState()

  useEffect(() => {
    onChangeDisableButton(
      typeof payload?.country_code === 'undefined' ||
        payload?.country_code === null ||
        payload?.country_code === '' ||
        typeof payload?.legal_entity_code === 'undefined' ||
        payload?.legal_entity_code === null ||
        payload?.legal_entity_code === '' ||
        typeof payload?.job_family_code === 'undefined' ||
        payload?.job_family_code === null ||
        payload?.job_family_code === '' ||
        typeof payload?.sub_job_family_code === 'undefined' ||
        payload?.sub_job_family_code === null ||
        payload?.sub_job_family_code === '' ||
        typeof payload?.job_title_id === 'undefined' ||
        payload?.job_title_id === null ||
        payload?.job_title_id === '' ||
        typeof payload?.name === 'undefined' ||
        payload?.name === null ||
        payload?.name === '' ||
        typeof payload?.definition === 'undefined' ||
        payload?.definition === null ||
        payload?.definition === '' ||
        typeof payload?.proficiency_level === 'undefined' ||
        payload?.proficiency_level === null ||
        payload?.proficiency_level === '',
    )
    setAllDataForm(payload)
  }, [payload])

  const handleGetCountry = async () => {
    try {
      await getCountry('')
        .then((res: any) => setDatasCountry(res ?? []))
        .catch(() => setDatasCountry([]))
    } catch (error) {
      setDatasCountry([])
    }
  }

  const handleGetLegalEntiy = async () => {
    try {
      await getLegalEntity('')
        .then((res: any) => setDatasLegalEntiy(res ?? []))
        .catch(() => setDatasLegalEntiy([]))
    } catch (error) {
      setDatasLegalEntiy([])
    }
  }

  const handleGetJobFamily = async () => {
    try {
      await getJobFamily('')
        .then((res: any) => {
          setDatasJobFamily(res ?? [])

          if (type === 'details') {
            const getId = res.find(({ key }) => key === payload?.job_family_code)
            setJobFamilyId(getId?.id)
            handleGetSubJobFamily({
              search: '',
              job_family_id: getId?.id ?? '',
            })
          }
        })
        .catch(() => setDatasJobFamily([]))
    } catch (error) {
      setDatasJobFamily([])
    }
  }

  const handleGetSubJobFamily = async ({ search, job_family_id }) => {
    try {
      await getSubJobFamily({ search, job_family_id })
        .then((res: any) => setDatasSubJobFamily(res ?? []))
        .catch(() => setDatasSubJobFamily([]))
    } catch (error) {
      setDatasSubJobFamily([])
    }
  }

  const handleGetJobTitle = async () => {
    try {
      await getJobTitle('')
        .then((res: any) => setDatasJobTitle(res ?? []))
        .catch(() => setDatasJobTitle([]))
    } catch (error) {
      setDatasJobTitle([])
    }
  }

  useEffect(() => {
    handleGetCountry()
    handleGetLegalEntiy()
    handleGetJobTitle()
    handleGetJobFamily()
  }, [])

  return (
    <ComponentStep2>
      {isLoading && (
        <Card style={{ borderRadius: 8, flex: 1 }}>
          <Row justify={'space-between'}>
            <Skeleton />
            <Row gutter={16}>
              <Skeleton />
              <Skeleton />
            </Row>
          </Row>
        </Card>
      )}

      {!isLoading && (
        <>
          <Card style={{ borderRadius: 8, flex: 1 }}>
            <Row gutter={[20, 20]}>
              <Col xs={12} xl={12}>
                <DebounceSelectSearch
                  placeholder={'Select'}
                  label="Status"
                  required
                  allowClear={false}
                  options={datasCountry}
                  value={payload?.country_code}
                  fetchOptions={(search) => getCountry(search)}
                  onChange={(item: any) => {
                    setAllDataForm({ ...payload, country_code: item?.key })
                  }}
                />
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelectSearch
                  placeholder={'Select'}
                  label="Legal Entity"
                  required
                  allowClear={false}
                  options={dataLegalEntiy}
                  fetchOptions={(search) => getLegalEntity(search)}
                  value={payload?.legal_entity_code}
                  onChange={(item: any) => {
                    setAllDataForm({ ...payload, legal_entity_code: item?.key })
                  }}
                />
              </Col>
            </Row>

            <Spacer size={20} />
            <Row gutter={[20, 20]}>
              <Col xs={12} xl={12}>
                <DebounceSelectSearch
                  required
                  placeholder="Select"
                  label="Job Family"
                  allowClear={false}
                  options={dataJobFamily}
                  fetchOptions={(search) => getJobFamily(search)}
                  value={payload?.job_family_code}
                  onChange={(item: any) => {
                    const getId = dataJobFamily.find(({ key }) => key === item?.key)
                    setJobFamilyId(getId?.id)
                    setAllDataForm({
                      ...payload,
                      job_family_code: item?.key,
                      sub_job_family_code: undefined,
                    })

                    handleGetSubJobFamily({
                      search: '',
                      job_family_id: getId?.id ?? '',
                    })
                  }}
                />
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelectSearch
                  required
                  placeholder="Select"
                  label="Sub Job Family"
                  allowClear={false}
                  disabled={payload?.job_family_code === undefined}
                  options={dataSubJobFamily}
                  fetchOptions={(search) => getSubJobFamily({ search, job_family_id: jobFamilyId })}
                  value={payload?.sub_job_family_code}
                  onChange={(item: any) => {
                    setAllDataForm({ ...payload, sub_job_family_code: item?.key })
                  }}
                />
              </Col>
            </Row>

            <Spacer size={20} />
            <Row gutter={[20, 20]}>
              <Col xs={12} xl={12}>
                <DebounceSelectSearch
                  required
                  placeholder="Select"
                  label="Job Title"
                  allowClear={false}
                  options={dataJobTitle}
                  fetchOptions={(search) => getJobTitle(search)}
                  value={payload?.job_title_id}
                  onChange={(item: any) => {
                    setAllDataForm({ ...payload, job_title_id: item?.key })
                  }}
                />
              </Col>
            </Row>
          </Card>

          <Spacer size={20} />
          <Card style={{ borderRadius: 8, flex: 1 }}>
            <Row gutter={[20, 20]}>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  required
                  type="input"
                  label="Competency Name"
                  placeholder="e.g Complex Problem Solving"
                  value={payload?.name ?? ''}
                  onChange={(e: any) => {
                    setAllDataForm({ ...payload, name: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', paddingTop: '4px' }}
                />
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  required
                  type="textarea"
                  label="Competency Definition"
                  placeholder="e.g The ability to analyze ambigious"
                  value={payload?.definition}
                  onChange={(e: any) => {
                    setAllDataForm({ ...payload, definition: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', paddingTop: '4px' }}
                />
              </Col>
            </Row>

            <Spacer size={20} />
            <Row gutter={[20, 20]}>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  required
                  type="select"
                  label="How Many Proficiency Level"
                  placeholder="Select"
                  allowClear={false}
                  options={optionsProficiencyLevel}
                  value={payload?.proficiency_level}
                  onChange={(item: any) => {
                    setAllDataForm({ ...payload, proficiency_level: item?.label })
                  }}
                  style={{ width: '100%', height: '38px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Card>
        </>
      )}
    </ComponentStep2>
  )
}

const ComponentStep2 = styled.div`
  .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: 0px solid #f5f5f5;
  }
` as any