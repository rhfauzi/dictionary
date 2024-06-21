export interface UploadFileProps {
  onSubmit?: any
  setVisible?: (boolean) => void
  start?: (string) => any
  finish?: () => any
  label?: string
  visible?: boolean
  required?: boolean
  defaultFile?: string
  disabled?: boolean
  withCrop?: boolean
  removeable?: boolean
  translate?: any
}
