/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider, DatePicker, Upload, message } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed, ICHCPicture, ICDocument } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import moment from 'moment'
import styled from 'styled-components'
import { uploadImages } from 'src/api/employee-self-service'
import { If, Then, Else } from 'react-if'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
const beforeUpload = (file: any) => {
  const acceptedTypes = ['image/gif', 'image/jpeg', 'image/png', 'application/pdf']
  if (!acceptedTypes.includes(file.type)) {
    message.error('You can only upload JPG/JPEG/PNG/PDF file!')
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!')
  }
  return acceptedTypes && isLt5M;
}

export default function Step9({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    name: '',
    institution: '',
    start_date: undefined,
    end_date: undefined,
    description: '',
    file_url: '',
  })
  const [inputList, setInputList] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [fileUploaderVisible, setFileUploaderVisible] = useState([{
    idx: null,
    visible: false,
  }])

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.training ?? [question])
    const prevImg = JSON.parse(localStorage.getItem('training_certificate')) ?? []
    setImageUrl(prevImg)

    const files = []
    prevData?.training?.forEach((_: any, index: number) => {
      files.push({ idx: index, visible: false })
    })
    setFileUploaderVisible(files)
  }, [])

  useEffect(() => {
    inputList?.forEach((item: any) => {
      setDisableButton(
        typeof item?.name === 'undefined'
        || item?.name === null
        || item?.name === ''
        || typeof item?.institution === 'undefined'
        || item?.institution === null
        || item?.institution === ''
        || typeof item?.start_date === 'undefined'
        || item?.start_date === null
        || item?.start_date === ''
        || typeof item?.end_date === 'undefined'
        || item?.end_date === null
        || item?.end_date === ''
        || typeof item?.description === 'undefined'
        || item?.description === null
        || item?.description === '',
      )
    })
  }, [inputList])

  const updateInputList = (idxToUpdate: number, varName: string, newValue: any) => {
    const updatedList = inputList.map((item: any, index: number) => {
      if (index === idxToUpdate) {
        return { ...item, [varName]: newValue }
      }
      return item
    })
    setInputList(updatedList)
  }

  const removeInputList = (idxToRemove: number) => {
    const updatedList = inputList.filter((_: any, index: number) => index !== idxToRemove);
    setInputList(updatedList)

    const imageUrl2 = imageUrl
    imageUrl2.splice(idxToRemove, 1)
    setImageUrl(imageUrl2)
    localStorage.setItem('training_certificate', JSON.stringify(imageUrl2))
  }

  const handleChangeUpload = async (data: any, index: number) => {
    if (data?.file?.status !== 'uploading') {
      const acceptedTypes = ['image/gif', 'image/jpeg', 'image/png', 'application/pdf']
      if (acceptedTypes.includes(data?.file?.type)) {
        getBase64(data?.file?.originFileObj as any, (imgUrl) => {
          const imageUrl2 = imageUrl
          imageUrl2[index] = imgUrl
          setImageUrl(imageUrl2)
          if (data?.file?.type === 'application/pdf') {
            localStorage.setItem('training_certificate', JSON.stringify(''))
          } else {
            localStorage.setItem('training_certificate', JSON.stringify(imageUrl2))
          }
        })

        const response = await uploadImages({ file: data?.file, type: 'training' })
        if (response?.status === 'success') {
          message.success('Your file successfully uploaded!')
        }
        updateInputList(index, 'file_url', response?.data?.file_url ?? '')
      }
    }
  }

  return (
    <>
      <Card style={{ borderRadius: 8, height: '627px', overflow: 'auto' }}>
        <Row gutter={[20, 20]}>
          <Col xs={24} xl={24}>
            <Text variant="headingRegular" style={{ fontWeight: 'bold', color: '#164882' }}>
              Training
            </Text>
            <Divider />
          </Col>

          {inputList.map((items: any, index: number) => (
          <>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Training Name'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g SAP Training"
                    value={items.name ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'name', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Institution'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g SAP"
                    value={items.institution ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'institution', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Start Date'} required/>
                </Col>
                <Col xs={20} xl={4}>
                  <DatePicker
                    placeholder='dd-mm-yyyy'
                    format={'DD-MM-YYYY'}
                    defaultValue={items.start_date !== undefined && items.start_date !== ''
                      ? moment(items.start_date)
                      : undefined
                    }
                    onChange={(data: any) => {
                      const datas = data ? moment(data).format('YYYY-MM-DD') : undefined
                      updateInputList(index, 'start_date', datas)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                  />
                </Col>
                <Col xs={20} xl={4}>
                  <Label text={'Finish Date'} required style={{ paddingLeft: '20px' }}/>
                </Col>
                <Col xs={20} xl={4}>
                  <DatePicker
                    placeholder='dd-mm-yyyy'
                    format={'DD-MM-YYYY'}
                    defaultValue={items.end_date !== undefined && items.end_date !== ''
                      ? moment(items.end_date)
                      : undefined
                    }
                    onChange={(data: any) => {
                      const datas = data ? moment(data).format('YYYY-MM-DD') : undefined
                      updateInputList(index, 'end_date', datas)
                    }}
                    style={{ border: '1px solid rgb(170, 170, 170)', borderRadius: '8px', height: '38px', width: '100%' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Description'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="input"
                    placeholder="e.g SAP Courses From Beginner To Advanced"
                    value={items.description ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'description', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '60px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Upload Certificate'} />
                  <div style={{ fontSize: '10px', color: '#666666' }}>
                    The training certificate<br />
                    format is .jpg .jpeg<br />
                    .png, .pdf, max size file 5 MB.<br />
                    Select a photo or drag<br />
                    and drop.
                  </div>
                </Col>
                <Col xs={12} xl={12}>
                  <UploadAnd
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={(item: any) => handleChangeUpload(item, index)}
                  >
                    <UploadCertificate>
                      {imageUrl[index]
                        ? (<div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <If condition={items?.file_url?.includes('.pdf')}>
                              <Then>
                                <div style={{ width: '40px', height: '40px', marginBottom: '10px' }}>
                                  <ICDocument />
                                </div>
                                <Text variant="headingRegular" style={{ fontWeight: 'bold', color: '#164882' }}>
                                  {items?.file_url?.replace('training/', '')}
                                </Text>
                              </Then>
                              <Else>
                                <img
                                  className='uploaded'
                                  src={imageUrl[index]}
                                  alt=""
                                  style={{ width: '100%' }}
                                />
                              </Else>
                            </If>
                            </div>)
                        : (<>
                            <ICHCPicture />
                            <div style={{ marginTop: 8 }}>Training Certificate Photo</div>
                          </>)
                      }
                    </UploadCertificate>
                  </UploadAnd>
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              {index > 0
                && <ButtonRemove
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    removeInputList(index)
                  }}
                  style={{
                    margin: '0px 10px',
                    border: '2px solid #2771c7',
                    color: 'white',
                    background: '#2771c7',
                  }}
                >
                  <ICTrashRed /> Remove
                </ButtonRemove>
              }
              <Divider />
            </Col>
          </>
          ))}
        </Row>

        <ButtonAddEducation
          size="big"
          variant="tertiary"
          onClick={() => {
            setInputList([...inputList, question])
            setFileUploaderVisible([...fileUploaderVisible, {
              idx: null,
              visible: false,
            }])
          }}
          style={{
            margin: '0px 10px',
            border: '2px solid #2771c7',
            color: 'white',
            background: '#2771c7',
          }}
        >
          <ICPlusBlue /> Training
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { training: [...inputList] })
        }}
      />
    </>
  )
}

const ButtonAddEducation = styled(Button)`
&& {
  background-color: #D4E4FC !important;
  border: 1px solid #D4E4FC !important;
  color: #2771C7 !important;
}
::hover { background-color: #164b89; border: 1px solid #164b89 }
` as any

const ButtonRemove = styled(Button)`
&& {
  background-color: white !important;
  border: 2px solid red !important;
  color: red !important;
}
` as any

const UploadAnd = styled(Upload)`
.ant-upload.ant-upload-select-picture-card {
  width: 100%;
  height: 180px;
  border: 0px;
  background-color: #ffffff00 !important;
}
`as any

const UploadCertificate = styled.div`
background: white;
border-radius: 8px;
border: 1px dashed #AAAAAA;
width: 100%;
height: 180px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
overflow: hidden;
cursor: pointer;

img {
  width: 50px !important;
}
img.uploaded {
  width: 100% !important;
  height: auto;
}
.title {
  color: #888888;
  font-size: 10px;
  margin-top: 10px;
  font-weight: 700;
}
` as any