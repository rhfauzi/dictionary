import { addColumn } from 'src/utils/createColumns'
import { Button } from 'pink-lava-ui'
import { Switch } from 'antd'
import { baseHandler } from './states/handler'

export function columns(
  handler: ReturnType<typeof baseHandler>,
) {
  const { handleDataForm, handleModal, handleModalStatus } = handler
  const handleAction = (record: any) => {
    handleModal('details')
    handleDataForm({
      code: record?.code,
      name: record?.name,
      is_active: record?.is_active,
    })
  }

  const onClickSwitch = (is_active: boolean, record: any) => {
    handleModalStatus(true)
    handleDataForm({
      code: record?.code,
      name: record?.name,
      is_active,
    })
  }

  return [
    {
      title: 'No',
      dataIndex: 'no',
      defaultSortOrder: 'asc',
      width: 60,
      sorter: (a: any, b: any) => a.no - b.no,
    },
    addColumn({
      title: 'ID',
      dataIndex: 'code',
    }),
    addColumn({
      title: 'Business Unit Name',
      dataIndex: 'name',
    }),
    addColumn({
      title: 'Active/Inactive',
      dataIndex: 'is_active',
      render: (value: any, record: any) => (
        <Switch checked={value} onChange={(bool: boolean) => onClickSwitch(bool, record)} />
      ),
    }),
    addColumn({
      title: 'Action',
      dataIndex: 'action',
      render: (text: string, record: any) => (
        <>
          {text !== '' ? (
            <Button
              className='hc-button-tertiary'
              size="small"
              variant="tertiary"
              onClick={() => handleAction(record)}>
              View Detail
            </Button>
          ) : (
            ''
          )}
        </>
      ),
    }),
  ]
}