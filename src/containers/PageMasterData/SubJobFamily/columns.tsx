import { addColumn } from 'src/utils/createColumns'
import { Button, Text } from 'pink-lava-ui'
import { Switch, Tooltip } from 'antd'
import { baseHandler } from './states/handler'

export function columns(handler: ReturnType<typeof baseHandler>) {
  const { handleDataForm, handleModal, handleModalStatus } = handler
  const handleAction = (record: any) => {
    handleModal('details')
    handleDataForm({
      id: record?.id,
      code: record?.code,
      name: record?.name,
      description: record?.description,
      job_family_code: record?.job_family_code,
      is_active: record?.is_active,
    })
  }

  const onClickSwitch = (is_active: boolean, record: any) => {
    handleModalStatus(true)
    handleDataForm({
      id: record?.id,
      code: record?.code,
      name: record?.name,
      description: record?.description,
      job_family_code: record?.job_family_code,
      is_active,
    })
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
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
      title: 'Sub Job Family',
      dataIndex: 'name',
    }),
    addColumn({
      title: 'Description',
      dataIndex: 'description',
      ellipsis: {
        showTitle: false,
      },
      width: 500,
      render: (desc: any) => (
        <Tooltip placement="left" title={desc}>
          <Text className="truncated">{truncateText(desc, 150)}</Text>
        </Tooltip>
      ),
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
              className="hc-button-tertiary"
              size="small"
              variant="tertiary"
              onClick={() => handleAction(record)}
            >
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
