import { Modal as ModalAntd, Upload } from 'antd'
import styled from 'styled-components'

export const { Dragger } = Upload
export const BaseDragger = styled(Dragger)``
export const BaseModal = styled(ModalAntd)`
  .ant-upload.ant-upload-drag {
    background: white;
    border: 1px dashed #AAAAAA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  .ant-upload.ant-upload-drag .ant-upload-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ant-upload.ant-upload-drag .ant-upload-drag-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ant-modal-content {
    background: #ffffff;
    border-radius: 16px;
    height: max-content;
  }

  .ant-modal-header {
    border-radius: 16px;
    border: none;
  }

  .ant-modal-title {
    color: #000000 !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 34px !important;
    line-height: 46px !important;
  }

  .ant-modal-footer {
    border: none;
  }

  .ant-modal-body > span {
    display: flex;
    flex-direction: column-reverse;
    gap: 12px;
  }
`
export const CustomModal = styled(BaseModal)`
.hc-button { background-color: #2771C7; border: 1px solid #2771C7; margin-bottom: 10px; height: 41px; }
.hc-button:hover { background-color: #164b89; border: 1px solid #164b89  }
.hc-button:disabled { background-color: #DDDDDD !important; border: 2px solid #DDDDDD !important }

.hc-button-export { background-color: #D4E4FC; border: 1px solid #D4E4FC; color: #2771C7 }
.hc-button-export:hover { background-color: #164b893b; }

.hc-button-tertiary { background-color: #FFFFFF; border: 2px solid #2771C7; color: #2771C7 }
.hc-button-tertiary:hover { border: 2px solid #114480; color: #114480 }
.hc-button-tertiary:disabled { background-color: #DDDDDD; border: 2px solid #DDDDDD }
`

export const TextPhoto = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #aaaaaa;
`

export const ImagePhoto = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 8px;
  background: #ffffff;
`

export const Label = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`

export const DocumentTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
`

export const Document = styled.div`
  background: #ffffff;
  border: 1px dashed #aaaaaa;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 16px 12px;
  display: flex;
  gap: 6px;
  justify-content: space-between;
  align-items: center;
`

export const DragTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #2771C7;
`

export const Title = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #888888;
`

export const OrText = styled.div`
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #888888;
  margin-top: 12px;
  margin-bottom: 12px;
`

export const Subtitle = styled.div`
  font-weight: normal;
  min-height: 18px;
  font-size: 14px;
  line-height: 24px;
  color: #ed1c24;
  margin-top: 8px;
`

export const UploadText = styled.div`
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`