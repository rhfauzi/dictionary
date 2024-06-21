import { addColumn } from 'src/utils/createColumns'
import { Button, Text } from 'pink-lava-ui'
import { Switch } from 'antd'
import { baseHandler } from './states/handler'

export function columns(handler: ReturnType<typeof baseHandler>) {
  const { handleDataForm, handleModal, handleModalStatus } = handler
  const handleAction = (record: any) => {
    handleModal('details')
    handleDataForm({
      id: record?.id,
      code: record?.code,
      job_title_id: record?.job_title_id,
      legal_entity_code: record?.legal_entity_code,
      country_code: record?.country_code,
      job_family_code: record?.job_family_code,
      sub_job_family_code: record?.sub_job_family_code,
      job_grade_id: record?.job_grade_id,
      is_active: record?.is_active,
    })
  }

  const onClickSwitch = (is_active: boolean, record: any) => {
    handleModalStatus(true)
    handleDataForm({
      id: record?.id,
      is_active,
    })
  }

  const formatNumberToString = (num, minChars) => {
    return num.toString().length < minChars
      ? formatNumberToString(`0${num}`, minChars)
      : num.toString()
  }

  return [
    addColumn({
      title: 'ID',
      dataIndex: 'id',
      width: 15,
      render: (id: any) => <Text>{formatNumberToString(id, 4)}</Text>,
    }),
    addColumn({
      title: 'Job Code',
      dataIndex: 'code',
    }),
    addColumn({
      title: 'Job Title',
      dataIndex: 'job_title_name',
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
