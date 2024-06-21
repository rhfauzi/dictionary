/* eslint-disable no-use-before-define */
import { FileExcelOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import {
  Button as ButtonAntd,
  Col,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Modal,
  Row,
  Table,
  Typography,
} from 'antd'
import { Button, Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import {
  createKPIResult,
  deleteKPIResult,
  updateKPIResult,
  uploadTemplate,
} from 'src/api/kpi-result'
import DebounceSelect from 'src/components/DebounceSelect'
import { EmptyState } from 'src/components/EmptyPagesLayout'
import FileUploaderExcel from 'src/components/FileUploaderExcel2'
import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { useKPIResultContext } from '../states'
import {
  ConfirmActiveSuccess,
  ConfirmDeleteSuccess,
  ConfirmSubmit,
  ConfirmSubmitSuccess,
} from './alerts'

interface Item {
  kpi_monthly_target_id: number
  kpi_result_id: number
  month: string
  details: any[]
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
  handleUploadFile: (visible: boolean) => void
  form: any
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  handleUploadFile,
  form,
  ...restProps
}) => {
  // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  const inputNode =
    dataIndex === 'result_value' ? (
      <InputNumber />
    ) : dataIndex === 'result_date' ? (
      <DatePicker />
    ) : dataIndex === 'result_file_url' ? (
      !form.file_url ? (
        <ButtonAntd type="link" onClick={() => handleUploadFile(true)}>
          Choose File
        </ButtonAntd>
      ) : (
        <a href={form?.file_url}>
          <FileExcelOutlined />
        </a>
      )
    ) : (
      <Text>Null</Text>
    )
  const fieldName =
    dataIndex === 'result_value'
      ? 'value'
      : dataIndex === 'result_date'
      ? 'date'
      : dataIndex === 'result_file_url'
      ? 'file_url'
      : 'emptyField'
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={fieldName}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export default function SectionCreateAndUpdate() {
  const {
    state: { showModal, dataForm, confirm, disableButton },
    handler,
  } = useKPIResultContext()
  const { handleModal, handleDataForm, handleConfirm, runProcess, stopProcess } = handler

  const [data, setData] = useState(dataForm?.details)
  const [form] = Form.useForm()
  const [visible, setVisible] = useState<boolean>(false)
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

  const [editingKey, setEditingKey] = useState(null)
  const isEditing = (record: Item): boolean => record.kpi_monthly_target_id === editingKey

  const edit = (record: Item) => {
    form.setFieldsValue({
      date: '',
      value: 0,
      file_url: '',
    })
    setEditingKey(record.kpi_monthly_target_id)
  }
  const cancel = () => {
    form.setFieldsValue({})
    setEditingKey(null)
  }

  const create = async (record: Item) => {
    console.log('create', record)
    form.setFieldsValue({
      value: 0,
      file_url: '',
      date: '',
      kpi_monthly_target_id: record?.kpi_monthly_target_id,
    })
    setEditingKey(record.kpi_monthly_target_id)
  }

  const save = async (key: Item) => {
    console.log(key)
    try {
      const row = await form.validateFields()
      if (key.kpi_result_id !== 0) {
        console.log('edit')
        handleConfirm('success-active')
        try {
          const res = await updateKPIResult({
            ...row,
            kpi_result_id: key?.kpi_result_id,
          })
          if (res?.status === 200 || res?.status === 201) {
            handleConfirm('success-active')
          } else {
            handleConfirm(undefined)
          }
          stopProcess()
        } catch (e) {
          handleConfirm(undefined)
        }
        setEditingKey('')
      } else {
        console.log('create')
        setData({ ...row, kpi_monthly_target_id: key.kpi_monthly_target_id })
        runProcess(`Wait for submitting KPI Result`)
        try {
          const res = await createKPIResult({
            ...row,
            kpi_monthly_target_id: key.kpi_monthly_target_id,
          })
          if (res?.status === 200 || res?.status === 201) {
            handleConfirm('success-active')
          } else {
            handleConfirm(undefined)
          }
          stopProcess()
        } catch (e) {
          handleConfirm(undefined)
        }
        setEditingKey('')
        // handleModal(undefined)
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const handleDelete = async (payload: any) => {
    runProcess(`Wait for deleting KPI Result`)
    try {
      const res = await deleteKPIResult(payload)
      if (res?.status === 200 || res?.status === 201) {
        console.log('status 200')
        handleConfirm('delete-success')
      } else {
        console.log('status selain 200')
        handleConfirm(undefined)
      }
      stopProcess()
    } catch (error) {
      console.log('error')
      handleConfirm(undefined)
    }
    setEditingKey('')
  }

  async function uploadAction(data: any) {
    runProcess('Wait for upload template')
    try {
      const response = await uploadTemplate(data?.file)
      if (response?.status === 200 || response?.status === 201) {
        form.setFieldsValue({
          ...form,
          file_url: response?.data?.data?.file_url,
        })
      }
    } catch (error) {
      console.log('error', error)
    }
    stopProcess()
    // router.push(router.pathname)
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
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Typography.Link title="Sure to cancel?" onClick={cancel}>
              Cancel
            </Typography.Link>
          </span>
        ) : record?.kpi_result_id !== 0 ? (
          <Row>
            <Typography.Link onClick={() => edit(record)}>Edit</Typography.Link>
            <Spacer size={20} />
            <Typography.Link onClick={() => handleDelete(record)}>Delete</Typography.Link>
          </Row>
        ) : (
          <Typography.Link onClick={() => create(record)}>Create</Typography.Link>
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
            editing: child.dataIndex === 'result_description' ? null : isEditing(record),
            handleSave: save,
            handleUploadFile: setVisible,
            form: form.getFieldsValue(),
          }),
        }
      }),
    }
  })

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
        {confirm === 'success-active' && <ConfirmActiveSuccess />}
        {confirm === 'delete-success' && <ConfirmDeleteSuccess />}
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
        <Form form={form} component={false}>
          <CustomTable
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            rowKey={'kpi_result_id'}
            dataSource={inputField?.details ?? []}
            columns={mergedColumns}
            loading={loading}
            scroll={{ y: 600 }}
            showSorterTooltip={true}
            pagination={false}
            locale={{
              emptyText: <EmptyState {...payloadEmpty} />,
            }}
          />
        </Form>
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
