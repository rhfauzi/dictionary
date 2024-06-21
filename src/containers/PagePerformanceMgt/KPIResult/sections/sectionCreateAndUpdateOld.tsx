/* eslint-disable no-use-before-define */
import { FileExcelOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import {
  Button as ButtonAntd,
  Col,
  Divider,
  Input,
  Modal,
  Popconfirm,
  Row,
  Table,
  Typography,
  Popover,
} from 'antd'
import moment from 'moment'
import { Button, Spacer, Text } from 'pink-lava-ui'
import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteKPIResult, uploadTemplate } from 'src/api/kpi-result'
import FileUploaderExcel from 'src/components/FileUploaderExcel2'
import DebounceSelect from 'src/components/DebounceSelect'
import { EmptyState } from 'src/components/EmptyPagesLayout'
import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { useKPIResultContext } from '../states'
import { ConfirmActiveSuccess, ConfirmDeleteSuccess, ConfirmSubmit, ConfirmSubmitSuccess } from './alerts'
import { useRouter } from 'next/router'
import { IconAdd } from 'src/assets'

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

export default function SectionCreateAndUpdate() {
  const {
    state: { datas, showModal, dataForm, confirm, disableButton },
    handler,
  } = useKPIResultContext()
  const { handleModal, handleDataForm, handleConfirm, runProcess, stopProcess } = handler
  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false)
  const [isDownloadSuccess, setDownloadSuccess] = useState<any>(null)
  const [payloadEmpty, setPayloadEmpty] = useState({
    title: '',
    subtitle: '',
  })
  const [loading, setLoading] = useState(false)
  const [inputField, setInputField] = useState<any>({
    weight: null,
    value_type: '',
    uom: '',
    name: '',
    target: 0,
    kpi_condition: '',
    details: [],
  })
  const isModalCreate = showModal === 'create'

  useEffect(() => {
    if (!isModalCreate) {
      handleDataForm({ ...dataForm })
      setInputField({
        weight: dataForm?.weight,
        value_type: dataForm?.value_type,
        uom: dataForm?.uom,
        name: dataForm?.name,
        target: dataForm?.target,
        kpi_condition: dataForm?.kpi_condition,
        details: dataForm?.details?.filter((item) => item.value !== 0),
      })
    }
  }, [])

  async function uploadAction(data: any) {
    runProcess('Wait for upload template')
    try {
      console.log('uploadAction', data)
      const response = await uploadTemplate(data?.file)
      console.log('response, uploadAction', response)
      if (response?.status === 200 || response?.status === 201) {
        setDownloadSuccess(response)
        handleDataForm({
          ...dataForm,
          edit_payload: {
            ...dataForm.edit_payload,
            // date: moment().format('YYYY/MM/DD'),
            path_file: response?.data?.data?.file_url,
          },
        })
      }
    } catch (error) {
      console.log('error', error)
    }
    stopProcess()
    // router.push(router.pathname)
  }

  const footer = (
    <Footer style={{ display: 'flex', gap: 10, marginBottom: '20px', justifyContent: 'flex-end' }}>
      <Button
        size="big"
        variant="tertiary"
        className="hc-button-tertiary"
        style={{}}
        onClick={() => {
          handleModal(undefined)
          handleDataForm({})
        }}
      >
        Refresh Form
      </Button>

      <Button
        size="big"
        variant="primary"
        className="hc-button"
        style={{}}
        disabled={disableButton || !isModalCreate}
        onClick={() => {
          handleConfirm('confirm-submit')
        }}
      >
        {isModalCreate ? 'Save' : 'Update'}
      </Button>
    </Footer>
  )

  const [open, setOpen] = useState(false)
  const [editingKey, setEditingKey] = useState(null)
  const isEditing = (record: Item): boolean => record.kpi_result_id === editingKey

  const edit = (record: Item) => setEditingKey(record.kpi_result_id)
  const cancel = () => setEditingKey(null)
  const handleDelete = async (payload: any) => {
    runProcess(`Wait for deleting KPI Result`)
    try {
      const res = await deleteKPIResult(payload)
      if (res?.status === 200 || res?.status === 201) {
        handleModal(undefined)
        handleConfirm('success-delete')
      } else {
        handleConfirm(undefined)
      }
      stopProcess()
    } catch (error) {
      handleConfirm(undefined)
    }
  }

  const save = (newItem: Item) => {
    console.log('save newItem', newItem)
    console.log('dataForm new', dataForm)
    const newData = inputField?.details.map((item) =>
      item.kpi_result_id === newItem.kpi_result_id ? newItem : item,
    )
    setInputField((prev) => ({ ...prev, details: newData }))
    // setEditingKey(null)
  }

  const column = [
    {
      title: 'No',
      width: 25,
      render: (a: any, _: any, index: any) => index + 1,
    },
    {
      title: 'Monthly Target',
      children: [
        {
          title: 'Month',
          dataIndex: 'month',
          width: 50,
        },
        {
          title: 'Target',
          dataIndex: 'value',
          width: 40,
        },
      ],
    },
    {
      title: 'Result',
      dataIndex: 'individual_performance',
      children: [
        {
          title: 'Result Description',
          dataIndex: 'result_description',
          width: 50,
          editable: true,
        },
        {
          title: 'Result Value',
          dataIndex: 'result_value',
          width: 50,
          editable: true,
        },
        {
          title: 'Result Date',
          dataIndex: 'result_date',
          width: 50,
          editable: true,
        },
        {
          title: 'Upload File',
          dataIndex: 'result_file_url',
          width: 50,
          editable: true,
          render: (result_file_url: string) => (
            <>
              {result_file_url && (
                <a href={result_file_url}>
                  <FileExcelOutlined />
                </a>
              )}
            </>
          ),
        },
      ],
    },
    {
      title: 'Action',
      dataIndex: 'action',
      editable: true,
      width: 70,
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return record?.kpi_result_id !== 0 ? (
          <>
            {editable ? (
              <Row justify="space-around" align="middle">
                <Text
                  onClick={() => save(record)}
                  variant="label"
                  style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                >
                  Save
                </Text>
                <Text
                  variant="label"
                  style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                  onClick={cancel}
                >
                  Cancel
                </Text>
              </Row>
            ) : (
              <Row justify="space-around" align="middle">
                <Text
                  onClick={() => edit(record)}
                  variant="label"
                  style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                >
                  Edit
                </Text>
                <Popconfirm
                  arrowContent={<Text>Test</Text>}
                  title="Sure to cancel?"
                  onConfirm={() => handleDelete(record)}
                >
                  <Text variant="label" style={{ color: COLORS.blue.regular, cursor: 'pointer' }}>
                    Delete
                  </Text>
                </Popconfirm>
              </Row>
            )}
          </>
        ) : (
          <>
            {editable ? (
              <Row justify="space-around" align="middle">
                <Text
                  onClick={() => save(record)}
                  variant="label"
                  style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                >
                  Save
                </Text>
                <Text
                  variant="label"
                  style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                  onClick={cancel}
                >
                  Cancel
                </Text>
              </Row>
            ) : (
              <Row justify="center">
                <Text
                  style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                  onClick={() => {
                    edit(record)
                  }}
                >
                  Create
                </Text>
              </Row>
            )}
          </>
        )
      },
    },
  ]

  const mergedColumns: TableProps<Item>['columns'] = column.map((col) => {
    if (!col.children) {
      return col
    }
    return {
      ...col,
      children: col.children.map((child) => {
        if (!child.editable) {
          return child
        }
        return {
          ...child,
          onCell: (record: Item) => ({
            record,
            inputType: child.dataIndex === 'result_value' ? 'number' : 'text',
            dataIndex: child.dataIndex,
            title: child.title,
            editing: isEditing(record),
            handleSave: save,
          }),
        }
      }),
    }
  })

  const EditableCell: React.FC<EditableCellProps> = useCallback(
    ({
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
      const [value, setValue] = useState(() => {
        return editingKey === record?.kpi_result_id
          ? { ...record }
          : {
              result_value: 0,
              result_date: moment(new Date()).format('YYYY-MM-DD'),
              result_file_url: '',
            }
      })
      console.log('value', value)
      const inputRef = useRef(null)
      const inputNode =
        dataIndex === 'result_date' || dataIndex === 'result_value' ? (
          <Input
            ref={inputRef}
            disabled={dataIndex === 'result_date'}
            value={
              dataIndex === 'result_date'
                ? moment(value[dataIndex]).format('MMMM')
                : value[dataIndex]
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
    },
    [isDownloadSuccess, editingKey],
  )

  return (
    <>
      <Modal
        zIndex={1000}
        closable={true}
        open={showModal !== undefined}
        width={'75%'}
        onCancel={() => {
          handleModal(undefined)
          handleDataForm({})
          handleConfirm(undefined)
        }}
        footer={footer}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          {isModalCreate ? 'View Hasil KPI 2022' : 'View Detail'}
        </Typography.Title>
        <Spacer size={25} />
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <DebounceSelect
                  label="Performance Indicator"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="e.g GP 1 Margin Achievement"
                  value={inputField?.name ?? null}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
              <Col span={6}>
                <DebounceSelect
                  label="UOM"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="e.g Rasio gross terhadap pencapaian net sales"
                  value={inputField?.uom ?? null}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, job_title_id: e?.value ?? null })
                    handleDataForm({ ...dataForm, job_title_id: e?.value ?? null })
                  }}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
              <Col span={6}>
                <DebounceSelect
                  label="Bobot"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="e.g Rasio gross terhadap pencapaian net sales"
                  value={inputField?.weight ?? null}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, job_title_id: e?.value ?? null })
                    handleDataForm({ ...dataForm, job_title_id: e?.value ?? null })
                  }}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Spacer size={20} />
          <Col span={24}>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <DebounceSelect
                  label="Value Indicator"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="Increase"
                  value={inputField?.kpi_condition ?? null}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, job_title_id: e?.value ?? null })
                    handleDataForm({ ...dataForm, job_title_id: e?.value ?? null })
                  }}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
              <Col span={6}>
                <DebounceSelect
                  label="Value Type"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="Accumulation"
                  value={inputField?.value_type ?? null}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, job_title_id: e?.value ?? null })
                    handleDataForm({ ...dataForm, job_title_id: e?.value ?? null })
                  }}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
              <Col span={6}>
                <DebounceSelect
                  label="Target"
                  disabled={!isModalCreate}
                  required
                  allowClear
                  type="input"
                  placeholder="Target"
                  value={inputField?.target ?? null}
                  onChange={(e: any) => {
                    setInputField({ ...inputField, job_title_id: e?.value ?? null })
                    handleDataForm({ ...dataForm, job_title_id: e?.value ?? null })
                  }}
                  style={{
                    width: '100%',
                    height: '38px',
                    fontSize: '14px',
                    paddingTop: '4px',
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider dashed style={{ margin: '20px 0px' }} />
        <div>
          <CustomTable
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            rowKey={'kpi_result_id'}
            dataSource={inputField?.details ?? []}
            // rowClassName={() => 'editable-row'}
            columns={mergedColumns}
            loading={loading}
            scroll={{ y: 600 }}
            showSorterTooltip={true}
            pagination={false}
            locale={{
              emptyText: <EmptyState {...payloadEmpty} />,
            }}
          />
        </div>

        {confirm === 'confirm-submit' && <ConfirmSubmit />}
        {confirm === 'success-submit' && <ConfirmSubmitSuccess />}
      </Modal>
      <FileUploaderExcel
        visible={visible}
        setVisible={setVisible}
        removeable={true}
        onSubmit={uploadAction}
        start={runProcess}
        finish={stopProcess}
      />
    </>
  )
}

const Footer = styled.div`
  .hc-button {
    background-color: #2771c7;
    border: 1px solid #2771c7;
  }
  .hc-button: hover {
    background-color: #164b89;
    border: 1px solid #164b89;
  }
  .hc-button: disabled {
    background-color: #dddddd;
    border: 1px solid #dddddd;
  }
  .hc-button-tertiary {
    background-color: #ffffff;
    border: 2px solid #2771c7;
    color: #2771c7;
  }
  .hc-button-tertiary: hover {
    border: 2px solid #114480;
    color: #114480;
  }
  .hc-button-tertiary: disabled {
    background-color: #dddddd;
    border: 2px solid #dddddd;
  }
` as any

const CustomTable = styled(Table)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background: ${COLORS.blue.regular};
    border: 2px solid ${COLORS.blue.regular} !important;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner {
    border-color: ${COLORS.blue.regular};
  }
`
