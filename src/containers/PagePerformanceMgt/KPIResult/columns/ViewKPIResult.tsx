import { FileExcelOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import { useRouter } from 'next/router'
import { Text } from 'pink-lava-ui'
import { useState } from 'react'
import { uploadTemplate } from 'src/api/kpi-result'
import { FileUploaderExcel } from 'src/components'
import { COLORS } from 'src/const/COLORS'
import { baseHandler } from '../states/handler'

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
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
    handleSave: (record: Item) => void;
  }



export function columnsViewKPIResult(handler: ReturnType<typeof baseHandler>) {
  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false)
  const [isEdit, setEdit] = useState<boolean>(true)
  const [editingKey, setEditingKey] = useState('')

  const { handleDataForm, handleModal, handleModalStatus, runProcess, stopProcess } = handler
  const isEditing = (record: any) => record.kpi_result_id === editingKey
  const handleAction = (record: any) => {
    handleModal('details')
    handleDataForm({})
  }

  async function uploadAction(data: any) {
    runProcess('Wait for upload template')
    try {
      const response = await uploadTemplate(data?.file)
      if (response?.status === 200) {
        const url = window.URL.createObjectURL(response?.data)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'legal-entity.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.log('error', error)
    }
    stopProcess()
    router.push(router.pathname)
  }

  const save = async (key: React.Key) => {
    console.log('key', key)
    // try {
    //   const row = (await form.validateFields()) as Item;

    //   const newData = [...data];
    //   const index = newData.findIndex((item) => key === item.key);
    //   if (index > -1) {
    //     const item = newData[index];
    //     newData.splice(index, 1, {
    //       ...item,
    //       ...row,
    //     });
    //     setData(newData);
    //     setEditingKey('');
    //   } else {
    //     newData.push(row);
    //     setData(newData);
    //     setEditingKey('');
    //   }
    // } catch (errInfo) {
    //   console.log('Validate Failed:', errInfo);
    // }
  }

  const cancel = () => {
    setEditingKey('')
  }

  const edit = (record: any) => {
    setEditingKey(record.kpi_result_id)
  }

  return [
    {
      title: 'No',
      dataIndex: `record`,
      width: 25,
      render: (text, value, record: any) => record + 1,
      // fixed: 'left',
    },
    {
      title: 'Monthly Target',
      dataIndex: 'kpi',
      children: [
        {
          title: 'Month',
          dataIndex: 'month',
          // fixed: 'left',
          width: 50,
        },
        {
          title: 'Target',
          dataIndex: 'value',
          // fixed: 'left',
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
      width: 70,
      render: (_, record: any) => {
        const editable = (record: any) => isEditing(record)
        console.log('record', record)
        return (
          <>
            {record?.value > 0 ? (
              <>
                {editable ? (
                  <Row justify="space-around" align="middle">
                    <Text
                      variant="label"
                      style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                      onClick={() => save(record.id)}
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
                      disabled={editingKey !== ''}
                      onClick={() => edit(record)}
                      variant="label"
                      style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                    >
                      Edit
                    </Text>
                    <Text
                      variant="label"
                      style={{ color: COLORS.blue.regular, cursor: 'pointer' }}
                      onClick={cancel}
                    >
                      Delete
                    </Text>
                  </Row>
                )}
                <FileUploaderExcel
                  visible={visible}
                  setVisible={setVisible}
                  removeable={true}
                  onSubmit={uploadAction}
                  start={runProcess}
                  finish={stopProcess}
                />
              </>
            ) : null}
          </>
        )
      },
    },
  ]
}
