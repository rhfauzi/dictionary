/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text } from 'pink-lava-ui'
import { Col, Row, Divider, Radio, DatePicker, message, Upload } from 'antd'
import { Card } from 'src/components'
import styled from 'styled-components'
import { ICHCAvatar } from 'src/assets'
import Image from 'next/image'
import DebounceSelect from 'src/components/DebounceSelect'
import { getCountryOfbirth, uploadImages } from 'src/api/employee-self-service'
import moment from 'moment'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'
import {
  optionsReligion,
  optionsMartialStatus,
  optionsBloodType,
} from './dataOptions'

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
const beforeUpload = (file: any) => {
  const acceptedTypes = ['image/gif', 'image/jpeg', 'image/png'];
  if (!acceptedTypes.includes(file.type)) {
    message.error('You can only upload JPG/JPEG/PNG/PDF file!')
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!')
  }
  return acceptedTypes && isLt5M;
}

export default function Step1({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    image_url: null,
    gender: null,
    fullname: null,
    short_name: null,
    religion: null,
    marital_status: null,
    blood_type: null,
    place_of_birth: null,
    date_of_birth: undefined,
    country_of_birth: null,
    ethnicity: null,
    maiden_name: null,
  })
  const [imageUrl, setImageUrl] = useState<string>('')
  const [disableButton, setDisableButton] = useState<boolean>(true)

  useEffect(() => {
    setDisableButton(
      typeof question?.gender === 'undefined'
      || question?.gender === null
      || question?.gender === ''
      || typeof question?.fullname === 'undefined'
      || question?.fullname === null
      || question?.fullname === ''
      || typeof question?.short_name === 'undefined'
      || question?.short_name === null
      || question?.short_name === ''
      || typeof question?.religion === 'undefined'
      || question?.religion === null
      || question?.religion === ''
      || typeof question?.marital_status === 'undefined'
      || question?.marital_status === null
      || question?.marital_status === ''
      || typeof question?.blood_type === 'undefined'
      || question?.blood_type === null
      || question?.blood_type === ''
      || typeof question?.date_of_birth === 'undefined'
      || question?.date_of_birth === null
      || question?.date_of_birth === ''
      || typeof question?.country_of_birth === 'undefined'
      || question?.country_of_birth === null
      || question?.country_of_birth === ''
      || typeof question?.ethnicity === 'undefined'
      || question?.ethnicity === null
      || question?.ethnicity === ''
      || typeof question?.maiden_name === 'undefined'
      || question?.maiden_name === null
      || question?.maiden_name === ''
      || typeof question?.place_of_birth === 'undefined'
      || question?.place_of_birth === null
      || question?.place_of_birth === ''
      || typeof question?.image_url === 'undefined'
      || question?.image_url === null
      || question?.image_url === '',
    )
  }, [question])

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service')) ?? {}
    setQuestion({
      image_url: prevData?.image_url ?? null,
      gender: prevData?.gender ?? null,
      fullname: prevData?.fullname ?? null,
      short_name: prevData?.short_name ?? null,
      religion: prevData?.religion ?? null,
      marital_status: prevData?.marital_status ?? null,
      blood_type: prevData?.blood_type ?? null,
      place_of_birth: prevData?.place_of_birth ?? null,
      date_of_birth: prevData?.date_of_birth ?? undefined,
      country_of_birth: prevData?.country_of_birth ?? null,
      ethnicity: prevData?.ethnicity ?? null,
      maiden_name: prevData?.maiden_name ?? null,
    })
    const prevImg = prevData?.image_url !== undefined ? JSON.parse(localStorage.getItem('employeeImageUrl')) : ''
    setImageUrl(prevImg)
  }, [])

  const handleChangeUpload = async (data: any) => {
    if (data?.file?.status !== 'uploading') {
      getBase64(data?.file?.originFileObj as any, (imgUrl) => {
        setImageUrl(imgUrl)
        localStorage.setItem('employeeImageUrl', JSON.stringify(imgUrl))
      })
      const response = await uploadImages({ file: data?.file, type: 'employee' })
      setQuestion({ ...question, image_url: response?.data?.file_url ?? '' })
    }
  }

  return (
    <>
      <Card style={{ borderRadius: 8, height: '627px', overflow: 'auto' }}>
        <Row gutter={[20, 20]}>
          <Col xs={24} xl={24}>
            <Text variant="headingRegular" style={{ fontWeight: 'bold', color: '#164882' }}>
              Personal Information
            </Text>
            <Divider />
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChangeUpload}
                >
                  <UploadAvatar>
                    {imageUrl
                      ? <img className='uploaded' src={imageUrl} alt="" style={{ width: '100%' }} />
                      : (<>
                        <Image src={ICHCAvatar} alt=''/>
                        <div className='title'>Upload</div>
                      </>)
                    }
                  </UploadAvatar>
                </Upload>
              </Col>
              <Col xs={12} xl={12}>
                <div>
                  <b style={{ color: '#000000', fontSize: '14px' }}>Profile Photo</b>
                  <p style={{ color: '#666666', fontSize: '12px' }}>
                    This Photo will also be used for account profiles and employee identities.<br/>
                    Photo size 500 x 500 recommended, Format .JPG .JPEG .PNG, File Size Max. 5 MB,<br/>
                    Drag & Drop Photo or pressing “Upload”<br/>
                  </p>
                </div>

              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Gender'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <Radio.Group
                  name="radiogroup"
                  value={question?.gender ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, gender: e?.target?.value })
                  }}
                >
                  <Radio value={'Male'}>Male</Radio>
                  <Radio value={'Female'}>Female</Radio>
                </Radio.Group>
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Full Name'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required
                  type="input"
                  placeholder="e.g John Doe"
                  value={question?.fullname ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, fullname: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Short Name'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required
                  type="input"
                  placeholder="e.g John"
                  value={question?.short_name ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, short_name: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Religion'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  placeholder={'Select'}
                  type="select"
                  label=""
                  allowClear={false}
                  onChange={(item: any) => {
                    setQuestion({ ...question, religion: item?.value })
                  }}
                  options={optionsReligion}
                  value={question?.religion}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Martial Status'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  placeholder={'Select'}
                  type="select"
                  label=""
                  allowClear={false}
                  onChange={(item: any) => {
                    setQuestion({ ...question, marital_status: item?.value })
                  }}
                  options={optionsMartialStatus}
                  value={question?.marital_status}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Blood Type'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  placeholder={'Select'}
                  type="select"
                  label=""
                  allowClear={false}
                  onChange={(item: any) => {
                    setQuestion({ ...question, blood_type: item?.value })
                  }}
                  options={optionsBloodType}
                  value={question?.blood_type}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Country of Birth'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  placeholder={'Select'}
                  type="select"
                  label=""
                  allowClear={true}
                  onChange={(item: any) => {
                    setQuestion({ ...question, place_of_birth: item?.value })
                  }}
                  fetchOptions={(search) => getCountryOfbirth(search)}
                  value={question?.place_of_birth}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Place of Birth'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required
                  type="input"
                  placeholder="e.g Bandung"
                  value={question?.country_of_birth ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, country_of_birth: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Date of Birth'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DatePicker
                  placeholder="dd-mm-yyyy"
                  format={'DD-MM-YYYY'}
                  disabledDate={(current) => current.isAfter(moment())}
                  value={question?.date_of_birth !== undefined && question?.date_of_birth !== ''
                    ? moment(question?.date_of_birth)
                    : undefined
                  }
                  onChange={(data: any) => {
                    const datas = data ? moment(data).format('YYYY-MM-DD') : undefined
                    setQuestion({ ...question, date_of_birth: datas })
                  }}
                  style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Ethnicity'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required
                  type="input"
                  placeholder="e.g Melayu"
                  value={question?.ethnicity ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, ethnicity: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Maiden Name'} required/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required
                  type="input"
                  placeholder="e.g Gwen Stacy"
                  value={question?.maiden_name ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, maiden_name: e?.target?.value })
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

const UploadAvatar = styled.div`
background: #D4E4FC;
border-radius: 50%;
display: flex;
flex-direction: column;
align-items: center;
width: 100px;
height: 100px;
justify-content: center;
overflow: hidden;
cursor: pointer;

img {
  width: 50px !important;
}
img.uploaded {
  height: 100% !important;
  width: auto !important;
}
.title {
  color: #2771C7;
  font-size: 10px;
  font-weight: 700;
}
` as any

const UploadAnd = styled(Upload)`
.ant-upload.ant-upload-select-picture-card {
  background: white;
  border: 0px solid black;
}
`as any