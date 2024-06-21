import { addColumn } from 'src/utils/createColumns'
import { Button, Text } from 'pink-lava-ui'
import { Switch, Col, Row } from 'antd'
import { baseHandler } from './states/handler'
import { COLORS } from 'src/const/COLORS'

export function columns(handler: ReturnType<typeof baseHandler>) {
  const { handleDataForm, handleModal, handleModalStatus } = handler
  const handleAction = (record: any) => {
    handleModal('details')
    handleDataForm({
      id: record?.id ?? '',
      name: record?.name ?? '',
      description: record?.description ?? '',
      kpi_condition: record?.kpi_condition ?? '',
      kpi_category: record?.kpi_category ?? '',
      value_type: record?.value_type ?? '',
    })
  }

  return [
    {
      title: 'ID.',
      dataIndex: 'id',
      width: 10,
    },
    {
      title: 'KPI',
      dataIndex: 'name',
      width: 40,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: 'KPI Category',
      dataIndex: 'kpi_category',
      width: 15,
      render: (kpi_category) => (
        <Row
          align={'middle'}
          justify={'center'}
          style={{
            background: COLORS.blue.lightest,
            padding: '0.3rem',
            borderRadius: '4px',
            width: '5rem',
          }}
        >
          <Text style={{ color: COLORS.blue.regular, fontWeight: 'bold' }}>{kpi_category}</Text>
        </Row>
      ),
    },
    {
      title: 'Value Type',
      dataIndex: 'value_type',
      width: 15,
      render: (value_type) => (
        <Row
          align={'middle'}
          justify={'center'}
          style={{
            background: COLORS.cheese.lightest,
            padding: '0.3rem',
            borderRadius: '4px',
            width: '5rem',
          }}
        >
          <Text style={{ color: COLORS.cheese.dark, fontWeight: 'bold' }}>{value_type}</Text>
        </Row>
      ),
    },
    {
      title: 'KPI Condition',
      dataIndex: 'kpi_condition',
      width: 15,
      render: (kpi_condition) => (
        <Row
          align={'middle'}
          justify={'center'}
          style={{
            background: COLORS.red.lightest,
            padding: '0.3rem',
            borderRadius: '4px',
            width: '6rem',
          }}
        >
          <Text style={{ color: COLORS.red.regular, fontWeight: 'bold' }}>{kpi_condition}</Text>
        </Row>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: true,
      width: 15,
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
    },
  ]
}
