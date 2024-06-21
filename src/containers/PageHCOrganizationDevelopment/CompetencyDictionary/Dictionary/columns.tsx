import { addColumn } from 'src/utils/createColumns'
import { Button } from 'pink-lava-ui'
import { Switch } from 'antd'
import router from 'next/router'
import { baseHandler } from './states/handler'

export function columns(
  handler: ReturnType<typeof baseHandler>,
) {
  const { handleDataForm, handleModalStatus } = handler
  const handleAction = (record: any) => {
    if (record?.type === 'behaviour') {
      router.push(`/organization-development/competency-dictionary/behaviour-competency/${record?.id}`)
    } else {
      router.push(`/organization-development/competency-dictionary/technical-competency/${record?.id}`)
    }
  }

  const onClickSwitch = (is_active: boolean, record: any) => {
    handleModalStatus(true)
    handleDataForm({ ...record, is_active })
  }

  return [
    addColumn({
      title: 'Competency Name',
      dataIndex: 'name',
    }),
    addColumn({
      title: 'Competency Category',
      dataIndex: 'type',
      render: (value: string) => {
        let text = 'Technical Competency'
        if (value === 'behaviour') {
          text = 'Behaviour Competency'
        }
        return text
      },
    }),
    addColumn({
      title: 'Country',
      dataIndex: 'country_name',
    }),
    addColumn({
      title: 'Legal Entity',
      dataIndex: 'legal_entity_name',
    }),
    addColumn({
      title: 'Job Family',
      dataIndex: 'job_family_name',
    }),
    addColumn({
      title: 'Sub Job Family',
      dataIndex: 'sub_job_family_name',
    }),
    addColumn({
      title: 'Job Title',
      dataIndex: 'job_title_name',
    }),
    addColumn({
      title: 'Active/Inactive',
      dataIndex: 'is_active',
      width: 120,
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