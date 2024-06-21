/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text, Button } from 'pink-lava-ui'
import { Col, Row, Divider, message, Upload } from 'antd'
import { Card } from 'src/components'
import { ICPlusBlue, ICTrashRed, ICHCPicture, ICDocument } from 'src/assets'
import DebounceSelect from 'src/components/DebounceSelect'
import styled from 'styled-components'
import { uploadImages } from 'src/api/employee-self-service'
import { Else, If, Then } from 'react-if'
import Label from '../component/label'
import SectionButton from '../section/SectionButton'
import { optionsDocumentType } from './dataOptions'

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

export default function Step11({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    type: null,
    number: null,
    description: null,
    file_url: null,
  })

  const [inputList, setInputList] = useState([])
  const [imageUrl, setImageUrl] = useState([])
  const [disableButton, setDisableButton] = useState<boolean>(true)
  const [fileUploaderVisible, setFileUploaderVisible] = useState([])

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setInputList(prevData?.confidential_document ?? [question])
    const prevImg = JSON.parse(localStorage.getItem('confidential_document')) ?? []
    setImageUrl(prevImg)

    const files = []
    prevData?.confidential_document?.forEach((_: any, index: number) => {
      files.push({ idx: index, visible: false })
    })
    setFileUploaderVisible(files)
  }, [])

  useEffect(() => {
    inputList?.forEach((item: any) => {
      setDisableButton(
        typeof item?.type === 'undefined'
        || item?.type === null
        || item?.type === ''
        || typeof item?.number === 'undefined'
        || item?.number === null
        || item?.number === ''
        || typeof item?.file_url === 'undefined'
        || item?.file_url === null
        || item?.file_url === ''
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
    localStorage.setItem('confidential_document', JSON.stringify(imageUrl2))
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
            localStorage.setItem('confidential_document', JSON.stringify(''))
          } else {
            localStorage.setItem('confidential_document', JSON.stringify(imageUrl2))
          }
        })

        const response = await uploadImages({ file: data?.file, type: 'confidential_document' })
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
              Confidential Document
            </Text>
            <Divider />
          </Col>

          {inputList.map((items: any, index: number) => (
          <>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Document Type'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    placeholder={'Select'}
                    type="select"
                    label=""
                    allowClear={false}
                    onChange={(item: any) => {
                      updateInputList(index, 'type', item?.value)
                    }}
                    options={optionsDocumentType}
                    value={items.type}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xl={24}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={5} xl={5}>
                  <Label text={'Document Number'} required/>
                </Col>
                <Col xs={12} xl={12}>
                  <DebounceSelect
                    label=""
                    required
                    type="number"
                    placeholder="e.g 12344556677"
                    value={items.number ?? undefined}
                    onChange={(e: any) => {
                      updateInputList(index, 'number', e?.target?.value)
                    }}
                    style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
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
                    placeholder="e.g e-KTP"
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
                  <Label text={'Upload Certificate'} required/>
                  <div style={{ fontSize: '10px', color: '#666666' }}>
                    The training certificate<br />
                    format is .jpg .jpeg<br />
                    .png, .pdf max size file 5 MB.<br />
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
                                  {items?.file_url?.replace('confidential_document/', '')}
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
                            <div style={{ marginTop: 8 }}>Document Photo</div>
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
          <ICPlusBlue /> Document
        </ButtonAddEducation>
      </Card>

      <SectionButton
        disabled={disableButton}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, { confidential_document: [...inputList] })
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