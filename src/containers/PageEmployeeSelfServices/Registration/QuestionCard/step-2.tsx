/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text } from 'pink-lava-ui'
import { Col, Row, Divider, Input, Select } from 'antd'
import { Card } from 'src/components'
import styled from 'styled-components'
import DebounceSelect from 'src/components/DebounceSelect'
import { ICArrowDown } from 'src/assets'
import { getListProvinces, getListCities, getListDistricts } from 'src/api/employee-self-service'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'
import {
  optionsCountry,
  optionsPhoneCode,
} from './dataOptions'

export default function Step2({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    mobile_phone: null,
    personal_email: null,
    address: null,
    country: null,
    province: null,
    city: null,
    district: null,
    zip_code: null,
  })
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [dataOptionsProvinces, setDataOptionsProvinces] = useState([])
  const [dataOptionsCity, setDataOptionsCity] = useState([])
  const [dataOptionsDistricts, setDataOptionsDistricts] = useState([])
  const [inputEmail, setInputEmail] = useState('')

  useEffect(() => {
    setDisableButton(
      typeof question?.mobile_phone === 'undefined'
      || question?.mobile_phone === null
      || question?.mobile_phone === ''
      || typeof question?.personal_email === 'undefined'
      || question?.personal_email === null
      || question?.personal_email === ''
      || typeof question?.address === 'undefined'
      || question?.address === null
      || question?.address === ''
      || typeof question?.country === 'undefined'
      || question?.country === null
      || question?.country === ''
      || typeof question?.province === 'undefined'
      || question?.province === null
      || question?.province === ''
      || typeof question?.city === 'undefined'
      || question?.city === null
      || question?.city === ''
      || typeof question?.district === 'undefined'
      || question?.district === null
      || question?.district === ''
      || typeof question?.zip_code === 'undefined'
      || question?.zip_code === null
      || question?.zip_code === '',
    )
  }, [question])

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setQuestion({
      mobile_phone: prevData?.mobile_phone ?? null,
      personal_email: prevData?.personal_email ?? null,
      address: prevData?.address ?? null,
      country: prevData?.country ?? null,
      province: prevData?.province ?? null,
      city: prevData?.city ?? null,
      district: prevData?.district ?? null,
      zip_code: prevData?.zip_code ?? null,
    })
    setInputEmail(prevData?.personal_email ?? '')

    handleGetDataProvinces()
    if (prevData?.province) {
      const dataProvinces = JSON.parse(localStorage.getItem('dataProvinces')) ?? []
      const province = dataProvinces.filter((item: any) => item?.label === prevData?.province)[0]
      handleGetDataCities(province?.value ?? '')
    }
    if (prevData?.city) {
      const dataCities = JSON.parse(localStorage.getItem('dataCities')) ?? []
      const city = dataCities.filter((item: any) => item?.label === prevData?.city)[0]
      handleGetDataDistricts(city?.value ?? '')
    }
  }, [])

  const handleGetDataProvinces = async () => {
    await getListProvinces({})
      .then((res: any) => {
        setDataOptionsProvinces(res ?? [])
        localStorage.setItem('dataProvinces', JSON.stringify(res))
      })
      .catch(() => {
      })
  }

  const handleGetDataCities = async (province_id: any) => {
    await getListCities({ province_id: province_id ?? '' })
      .then((res: any) => {
        setDataOptionsCity(res ?? [])
        localStorage.setItem('dataCities', JSON.stringify(res))
      })
      .catch(() => {
      })
  }

  const handleGetDataDistricts = async (city_id: number) => {
    await getListDistricts({ city_id: city_id ?? '' })
      .then((res: any) => {
        setDataOptionsDistricts(res ?? [])
        localStorage.setItem('dataDistricts', JSON.stringify(res))
      })
      .catch(() => {
      })
  }

  const validate = (email: string) => {
    const validateEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    if (validateEmail) {
      return true
    }
    return false;
  }

  return (
    <>
      <Card style={{ borderRadius: 8, height: '627px' }}>
        <Row gutter={[20, 20]}>
          <Col xs={24} xl={24}>
            <Text variant="headingRegular" style={{ fontWeight: 'bold', color: '#164882' }}>
              Contact and Address Information
            </Text>
            <Divider />
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Mobile Phone'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <InputPhone
                  addonBefore={
                    <SelectBefore
                      defaultValue="+62"
                      className="select-before"
                      options={optionsPhoneCode}
                      suffixIcon={<ICArrowDown />}
                    />
                  }
                  maxLength={20}
                  onChange={(e: any) => {
                    const mobile_phone = e?.target?.value.replace(/[^0-9]/g, '');
                    setQuestion({ ...question, mobile_phone })
                  }}
                  value={question?.mobile_phone}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Personal Email'} required />
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required
                  type="input"
                  placeholder="e.g johndoe@email.com"
                  // value={question.personal_email ?? undefined}
                  value={inputEmail ?? undefined}
                  onChange={(e: any) => {
                    const isEmailTrue = validate(e?.target?.value)
                    setInputEmail(e?.target?.value)

                    if (isEmailTrue) {
                      setQuestion({ ...question, personal_email: e?.target?.value })
                    } else {
                      setQuestion({ ...question, personal_email: undefined })
                    }
                  }}
                  style={{ width: '100%', height: '38px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Address'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <div>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g Jl. Setiabudi No. 1"
                    value={question.address ?? undefined}
                    onChange={(e: any) => {
                      setQuestion({ ...question, address: e?.target?.value })
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Country'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <div>
                  <DebounceSelect
                    placeholder={'Select'}
                    type="select"
                    label=""
                    allowClear={false}
                    onChange={(item: any) => {
                      setQuestion({ ...question, country: item?.value })
                    }}
                    options={optionsCountry}
                    value={question?.country}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Province'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  placeholder={'Select'}
                  type="select"
                  value={question?.province}
                  options={dataOptionsProvinces}
                  onChange={(item: any) => {
                    setQuestion({
                      ...question,
                      city: undefined,
                      district: undefined,
                      province: item?.label,
                    })
                    handleGetDataCities(item?.value)
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'City'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  placeholder={'Select'}
                  type="select"
                  disabled={!question?.province}
                  options={dataOptionsCity}
                  onChange={(item: any) => {
                    setQuestion({
                      ...question,
                      district: undefined,
                      city: item?.label,
                    })
                    handleGetDataDistricts(item?.value)
                  }}
                  value={question?.city}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'District'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  placeholder={'Select'}
                  type="select"
                  disabled={!question?.city || !question?.province}
                  options={dataOptionsDistricts}
                  onChange={(item: any) => {
                    setQuestion({ ...question, district: item?.label })
                  }}
                  value={question?.district}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Zip Code'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required
                  type="input"
                  placeholder="e.g 12345"
                  value={question?.zip_code}
                  onChange={(e: any) => {
                    setQuestion({ ...question, zip_code: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, question)
        }}
      />
    </>
  )
}

const SelectBefore = styled(Select)`
background: white;
border: 1px solid rgb(170, 170, 170);
height: 38px;
border-radius: 8px 0px 0px 8px;
` as any

const InputPhone = styled(Input)`
background: white;
width: 100%;

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
  width: 95px;
  text-align: left;
}
` as any