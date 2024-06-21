import { Input } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { useKPIResultContext } from '../states'
import { FileExcelOutlined } from '@ant-design/icons'
import { Button as ButtonAntd } from 'antd'
import { Button, Spacer, Text } from 'pink-lava-ui'

interface Item {
  kpi_monthly_target_id: number
  kpi_result_id: number
  month: string
  result_description: string
  result_value: number
  result_date: string
  result_file_url: string
  value: number
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Item
  index: number
  children: React.ReactNode
  handleSave: (record: Item) => void
  handleRefInput: (record: any) => void
}
export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  handleSave,
  handleRefInput,
  ...restProps
}) => {
  const {
    state: { datas, showModal, dataForm, confirm, disableButton },
    handler,
  } = useKPIResultContext()
  const { handleModal, handleDataForm, handleConfirm, runProcess, stopProcess } = handler
  const [visible, setVisible] = useState<boolean>(false)
  const [value, setValue] = useState(() => {
    return editingKey === record?.kpi_result_id ? { ...record } : {}
  })
  const inputRef = useRef(null)
  const inputNode =
    dataIndex === 'result_date' || dataIndex === 'result_value' ? (
      <Input
        ref={inputRef}
        disabled={dataIndex === 'result_date'}
        // value={value[dataIndex]}
        value={
          dataIndex === 'result_date' ? moment(value[dataIndex]).format('MMMM') : value[dataIndex]
        }
        onChange={(e) => {
          setValue((prev) => ({ ...prev, [dataIndex]: e?.target?.value }))
          handleDataForm({
            ...dataForm,
            edit_payload: {
              ...dataForm?.edit_payload,
              [dataIndex]: inputRef.current.input.value ?? record,
              // date: moment().format('YYYY/MM/DD'),
            },
          })
        }}
      />
    ) : dataIndex === 'result_file_url' ? (
      dataForm?.edit_payload?.path_file ? (
        <a href={record?.result_file_url}>
          <FileExcelOutlined />
        </a>
      ) : (
        <ButtonAntd type="link" onClick={() => setVisible(true)}>
          Choose File
        </ButtonAntd>
      )
    ) : (
      <Text>{value[dataIndex]}</Text>
    )
  return <td {...restProps}>{editing ? <div>{inputNode}</div> : children}</td>
}
