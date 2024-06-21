import React from 'react'
import { Button } from 'pink-lava-ui'
import ReactToPrint from 'react-to-print'
import { Col as ColAntd, Row as RowAntd, Spin } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { responseError } from 'src/utils/generalUtils'
import { downloadExcel } from '../../api/base-master'
import NotificationGeneral from '../NotificationGeneral'
import { ICDownloadTemplate } from '../../assets'

interface IProps {
  title?: string
  payload: any
  url: string
  fileName: string
  className?: string
  isButton?: boolean
  isReplace?: string
  isSecondary?: boolean
  isDisabled?: boolean
  withIcon?: boolean
}

export default function DownloadButtonExcel(props: IProps) {
  const componentRef = React.useRef()
  const [loading, setLoading] = React.useState(false)
  const { contextHolder, openNotification } = NotificationGeneral()

  return (
    <React.Fragment>
      {contextHolder}
      <ReactToPrint
        onBeforeGetContent={async () => {
          setLoading(true)
          await downloadExcel(props.payload, props.url, props.isReplace)
            .then((response) => {
              openNotification('Download was successful', 'top')
              setTimeout(() => {
                setLoading(false)
                const url = window.URL.createObjectURL(new Blob([response]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${props.fileName}_Data.xlsx`)
                document.body.appendChild(link)
                link.click()
                link.remove()
              }, 300)
            })
            .catch((err) => {
              responseError(err)
              setLoading(false)
            })
        }}
        removeAfterPrint
        trigger={() =>
          (props.isButton === undefined || props.isButton ? (
            <Button
              loading={true}
              size="big"
              className={props.className}
              variant={props.isSecondary ? 'secondary' : 'primary'}
              disabled={props.isDisabled || loading}
            >
              {loading && (
                <Spin size="small" style={{ color: 'white', marginRight: 8, marginBottom: -4 }} />
              )}
              {props.withIcon && <DownloadOutlined style={{ marginRight: 6 }} />}
              <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>
                {' '}
                {props?.title ? props.title : 'Download'}
              </span>
            </Button>
          ) : (
            <RowAntd gutter={10} style={{ cursor: 'pointer' }}>
              <ColAntd>
                {loading ? (
                  <Spin size="small" style={{ color: 'white', marginRight: 8, marginBottom: -4 }} />
                ) : (
                  <ICDownloadTemplate />
                )}
              </ColAntd>
              <ColAntd>
                <span style={{ color: loading ? '#ad9d9d' : 'unset' }}>
                  {props?.title ? props.title : 'Download Data'}
                </span>
              </ColAntd>
            </RowAntd>
          ))
        }
        content={() => componentRef.current}
      />
    </React.Fragment>
  )
}
