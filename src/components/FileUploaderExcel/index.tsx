import React, { useState } from 'react'
import { Button, Row } from 'pink-lava-ui'
import { ICUpload, ICSync, ICDelete } from 'src/assets'
import * as xlsx from 'xlsx'
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
import { UploadFileProps } from './types'
import { DraggerProps } from 'antd/lib/upload/Dragger'
import { notification } from 'antd'
import { useRouter } from 'next/router'
import { CloudUploadOutlined } from '@ant-design/icons'


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
  const [fileData, setFileData] = useState<any>([])
  const [fileDataForUpload, setFileDataForUpload] = useState<any>()

  const router = useRouter()
  const acceptedImageTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

  const draggerProps: DraggerProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    action: '',
    style: { border: file ? 'none' : '1px dashed #EB008B' },
    onChange: (info) => {
      const { status } = info.file
    }
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

  const beforeUpload = (file: any) => {
    if (!acceptedImageTypes.includes(file.type)) {
      setError(`Failed, Uploaded files can't have ${file.type} extension`)
    }
    const isLt5M = file.size / 1024 / 1024 <= 5
    if (!isLt5M) {
      setError("Failed, Uploaded files can't be more than 5mb")
    }
    return acceptedImageTypes.includes(file.type) && isLt5M
  }

  return (
    <CustomModal
      open={visible}
      title="Upload"
      style={{ height: '200px' }}
      onOk={() => {
        if (!error) {
          start('Wait for Uploading')
          const payload = {
            data: fileData,
          }
          onSubmit(payload, fileDataForUpload)
            .then((response: any) => {
              finish()
            })
            .catch(() => finish())
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
        <div style={{ display: 'flex', gap: 9 }}>
          <Button
            size="small"
            variant="tertiary"
            style={{ flexGrow: 1, width: '105px', height: '41px', borderWidth: '2.5px' }}
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>
          <Button
            size="big"
            variant="primary"
            key="submit"
            type="primary"
            style={{
              flexGrow: 1,
              width: '105px',
              height: '41px',
              borderWidth: '2.5px',
              marginRight: '10px',
              marginBottom: '10px',
            }}
            onClick={() => {
              if (!error && file) {
                start('Wait for Uploading')
                const payload = {
                  data: fileData,
                }
                onSubmit(payload, fileDataForUpload)
                  ?.then((response: any) => {
                    if (response.data.error) {
                      notification.error(
                        {
                          message: 'Upload Failed',
                          description: response.data.error.split(';').join('\n'),
                          style: {
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: '700',
                            borderRadius: '8px',
                            padding: '30px',
                            letterSpacing: '0.25px',
                          },
                        });
                    } else {
                      router.push(router.asPath)
                    }
                    finish()
                  })
                  .catch(() => finish())
              }
              setVisible(false)
              setFile('')
              setFileUrl('')
            }}
          >
            Done
          </Button>,
        </div>
      ]}
    // hasFiles={!!file}
    >
      <BaseDragger
        accept=".xlsx"
        {...draggerProps}
        customRequest={({ file, onSuccess }) => {
          setError('')
          setFileDataForUpload(file)
          setTimeout(() => {
            if (beforeUpload(file)) {
              onSuccess('ok')
            } else {
              onSuccess('error')
            }
          }, 0)
        }}
        disabled={file}
        itemRender={(_, file, __) => {
          if (fileUrl) {
            return (
              <Document>
                <Row gap="12px" noWrap>
                  {error || !fileUrl || !withCrop ? (
                    <ICUpload />
                  ) : (
                    <img style={{ width: '48px', height: '48px' }} src={fileUrl} />
                  )}
                  <Column>
                    <DocumentTitle>{file?.name}</DocumentTitle>
                    <div style={{ color: `${error}` ? '#ED1C24' : '#2BBECB' }}>
                      {error ? error : 'Completed'}
                    </div>
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
          } else {
            return <></>
          }
        }}
        onChange={onChange}
      >
        {!file ? (
          <>
            {/* <ICSync /> */}
            <CloudUploadOutlined style={{ fontSize: '72px', color: '#888888' }} rev={undefined} />
            <Title>Drag & Drop or Browse Files</Title>
            <OrText>OR</OrText>
            <Button variant="tertiary" size="big">
              Browse File
            </Button>
            <Subtitle>Max file size 5 Mb</Subtitle>
          </>
        ) :
          null
        }
      </BaseDragger>
    </CustomModal>
  )
}
