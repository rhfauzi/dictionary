import { Row } from 'antd'
import { Button, Text } from 'pink-lava-ui'
import { getListKPIResultById } from 'src/api/kpi-result'
import { COLORS } from 'src/const/COLORS'
import { baseHandler } from '../states/handler'

export function columnsKPI(handler: ReturnType<typeof baseHandler>) {
  const { handleDataForm, handleModal, handleModalStatus, runProcess, stopProcess } = handler
  const handleGetKPIResultById = async (payload: any) => {
    runProcess('Wait for updating KPI Result')
    stopProcess()
    await getListKPIResultById(payload)
      .then((res: any) => {
        if (res.status === 200) {
          handleDataForm(res?.data?.data ?? { data: {} })
          handleModal('details')
        } else {
        }
        stopProcess()
      })
      .catch((err) => {
        stopProcess()
        handleModal('details')
      })
  }
  const handleAction = (record: any) => handleGetKPIResultById(record)
  const convertDate = (date: string) => {
    let d = new Date(date)
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const month = monthNames[d.getMonth()]
    const year = d.getFullYear()
    return `${month} ${year}`
  }

  return [
    {
      title: 'No.',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: 'KPI ID',
      dataIndex: 'kpi_setting_id',
      width: 70,
    },
    {
      title: 'Key Performance Indicators',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: 'UOM',
      dataIndex: 'uom',
      width: 50,
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      width: 70,
    },
    {
      title: 'Target',
      dataIndex: 'target',
      width: 70,
    },
    {
      title: 'Result Description',
      dataIndex: 'result_description',
      width: 250,
    },
    {
      title: 'Result Value',
      dataIndex: 'result_value',
      width: 90,
    },
    {
      title: 'Result Date',
      dataIndex: 'result_date',
      width: 40,
      render: (result_date) => <Text>{convertDate(result_date)}</Text>,
    },
    {
      title: 'Accumulative Value',
      dataIndex: 'accumulative_value',
      width: 150,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      width: 60,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: 'right',
      width: 150,
      render: (text: string, record: any) => (
        <Button
          className="hc-button-tertiary"
          size="small"
          variant="tertiary"
          onClick={() => handleAction(record)}
        >
          View Detail
        </Button>
      ),
    },
  ]
}

export function columnsPA(handler: ReturnType<typeof baseHandler>, totalScore: any) {
  console.log(totalScore)
  const { handleDataForm, handleModal, handleModalStatus } = handler
  const handleAction = (record: any) => {
    handleModal('details')
    handleDataForm({})
  }

  return [
    {
      title: 'Period',
      dataIndex: 'period',
      width: 150,
    },
    {
      title: 'KPI',
      width: 30,
      render: () => <Text>{`${totalScore}%`}</Text>,
    },
    {
      title: 'Individual Performance',
      width: 90,
      render: () => <Text>{`${totalScore}%`}</Text>,
    },
    {
      title: 'Employee Status',
      dataIndex: 'employee_status',
      width: 15,
      render: () => (
        <Row
          align={'middle'}
          justify={'center'}
          style={{
            background: COLORS.green.lightest,
            padding: '0.3rem',
            borderRadius: '4px',
            width: '5rem',
          }}
        >
          <Text style={{ color: COLORS.green.dark, fontWeight: 'bold' }}>Approved</Text>
        </Row>
      ),
    },
  ]
}
