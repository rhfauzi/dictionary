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
      division_id: record?.division_id,
      division_name: record?.division_name,
      department_id: record?.department_id,
      department_name: record?.department_name,
      is_active: record?.is_active,
    })
  }

  const onClickSwitch = (is_active: boolean, record: any) => {
    handleModalStatus(true)
    handleDataForm({
      division_id: record?.division_id,
      division_name: record?.division_name,
      department_id: record?.department_id,
      department_name: record?.department_name,
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
      title: 'Division Name',
      dataIndex: 'division_name',
    }),
    addColumn({
      title: 'Department Name',
      dataIndex: 'department_name',
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
              size='small'
              variant='tertiary'
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