/* eslint-disable comma-dangle */
import React, { useState } from 'react'
import { Button, Row } from 'pink-lava-ui'
import { ICUpload, ICDelete } from 'src/assets'
import * as xlsx from 'xlsx'
import { DraggerProps } from 'antd/lib/upload/Dragger'
// import { notification } from 'antd'
// import { useRouter } from 'next/router'
import { CloudUploadOutlined } from '@ant-design/icons'
import { UploadFileProps } from './types'
import {
  Title,
  CustomModal,
  BaseDragger,
  Document,
  DocumentTitle,
  UploadText,
  Subtitle,
  OrText,
  Column,
  DragTitle,
} from './styled'

export default function FileUploaderExcel({
  onSubmit,
  visible,
  setVisible,
  withCrop,
  removeable,
  start,
  finish,
}: UploadFileProps) {
  const [file, setFile] = useState<any>()
  const [error, setError] = useState<string>()
  const [fileUrl, setFileUrl] = useState<any>()
  const [fileData, setFileData] = useState([])

  // const router = useRouter()
  const acceptedImageTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    style: {
      border: file ? '1px dashed #2771C7' : '',
      padding: '16px 0px'
    },
  }

  const onChange = async ({ fileList: newFileList }) => {
    setFileUrl(URL.createObjectURL(newFileList[0].originFileObj))
    setFile(newFileList[0])
    let src = newFileList[0].url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () => {
          const data = reader.result
          if (newFileList[0].response === 'ok') {
            const workbook = xlsx.read(data, { type: 'array' })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const json = xlsx.utils.sheet_to_json(worksheet)
            setFileData(json)
          }
        }
        reader.readAsArrayBuffer(newFileList[0].originFileObj)
      })
    }
  }

  const beforeUpload = (files: any) => {
    if (!acceptedImageTypes.includes(files.type)) {
      setError(`Failed, Uploaded files can't have ${files.type} extension`)
    }
    const isLt5M = files.size / 1024 / 1024 <= 5
    if (!isLt5M) {
      setError("Failed, Uploaded files can't be more than 5mb")
    }
    return acceptedImageTypes.includes(files.type) && isLt5M
  }

  return (
    <CustomModal
      visible={visible}
      title={'Upload'}
      width={570}
      style={{ height: '200px' }}
      onOk={() => {
        if (!error) {
          const payload = {
            data: fileData,
          }
          onSubmit(payload)
        } else {
          setVisible(false)
        }
      }}
      onCancel={() => {
        setVisible(false)
        setFile('')
        setFileUrl('')
      }}
      footer={[
      <div key={1} style={{ display: 'flex', gap: 9 }}>
        <Button
          size="big"
          variant="primary"
          key="submit"
          type="primary"
          className="hc-button"
          style={{ width: '100%' }}
          onClick={() => {
            if (!error && file) {
              const payload = {
                data: fileData,
                file,
              }
              onSubmit(payload)
            }
            setVisible(false)
            setFile('')
            setFileUrl('')
          }}
        >
          {'Done'}
        </Button>,
        </div>
      ]}
    >
      <BaseDragger
        {...draggerProps}
        customRequest={({ file, onSuccess }) => {
          setError('')
          setTimeout(() => {
            if (beforeUpload(file)) {
              onSuccess('ok')
            } else {
              onSuccess('error')
            }
          }, 0)
        }}
        itemRender={(_, files, __) => {
          if (fileUrl) {
            return (
              <Document>
                <Row gap="12px" noWrap>
                  {error || !fileUrl || !withCrop ? (
                    <ICUpload />
                  ) : (
                    <img style={{ width: '48px', height: '48px' }} src={fileUrl}/>
                  )}
                  <Column>
                    <DocumentTitle>{files?.name}</DocumentTitle>
                    <UploadText style={{ color: `${error}` ? '#ED1C24' : '#2BBECB' }}>
                      {error || 'Completed'}
                    </UploadText>
                  </Column>
                </Row>
                {removeable ? (
                  <ICDelete
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setFile('')
                      setFileUrl('')
                    }}
                  />
                ) : (
                  <div></div>
                )}
              </Document>
            )
          }
        }}
        onChange={onChange}
        // onChange={onSubmit}
      >
        {!file ? (
          <div
            style={{
              margin: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <CloudUploadOutlined style={{ fontSize: '90px', color: '#888888' }} />
            <Title>{'Drag & Drop or Browse Files'}</Title>
            <OrText>{'OR'}</OrText>
            <Button variant="tertiary" size="big" className='hc-button-tertiary'>
            {'Browse File'}
            </Button>
            <Subtitle>{'Max file size 5 Mb'}</Subtitle>
          </div>
        ) : (
          <DragTitle>
            {'Drag & Drop or Browse Files'}
          </DragTitle>
        )}
      </BaseDragger>
    </CustomModal>
  )
}
