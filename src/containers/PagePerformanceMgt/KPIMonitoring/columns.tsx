import { Row } from 'antd'
import { Text } from 'pink-lava-ui'
import { COLORS } from 'src/const/COLORS'
import { baseHandler } from './states/handler'

export function columns(handler: ReturnType<typeof baseHandler>) {
  const { handleDataForm, handleModal, handleModalStatus } = handler
  const handleAction = (record: any) => {
    handleModal('details')
    handleDataForm({})
  }

  const styles = { width: 8, height: 8, borderRadius: 10, marginTop: 10 }
  const handleResultIndicator = (val: number) => {
    if (val >= 100) {
      return <div style={{ ...styles, background: COLORS.blue.regular }} />
    } else if (val >= 97.5 && val <= 100) {
      return <div style={{ ...styles, background: COLORS.green.regular }} />
    } else if (val >= 95 && val <= 97.5) {
      return <div style={{ ...styles, background: COLORS.green.regular }} />
    } else if (val >= 90 && val <= 94.99) {
      return <div style={{ ...styles, background: COLORS.green.regular }} />
    } else if (val >= 85 && val <= 89.99) {
      return <div style={{ ...styles, background: COLORS.green.regular }} />
    } else {
      return <div style={{ ...styles, background: COLORS.black.regular }} />
    }
  }

  const months = [
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

  return [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      fixed: 'left',
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Key Performance Indicators',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: 200,
    },
    {
      title: 'UoM',
      dataIndex: 'uom',
      key: 'uom',
      fixed: 'left',
      width: 50,
    },
    {
      title: 'Target / Actual',
      fixed: 'left',
      width: 125,
      render: (_, record) => (
        <Row justify="center" align="middle" style={{ flexDirection: 'column' }}>
          <Text>Target</Text>
          <Text>Result</Text>
          <Text>Achievement</Text>
          <Text>Score</Text>
          <div style={{ width: 8, height: 8, borderRadius: 10, marginTop: 10 }} />
        </Row>
      ),
    },
    {
      title: 'Yearly',
      dataIndex: ['monthly_result'],
      align: 'center' as const,
      children: months.map((month, monthIndex) => ({
        // children: (_, record) =>
        //   record?.monthly_result.map((month, monthIndex) => ({
        title: month.substr(0, 3),
        render: (_, record) => (
          <Row
            justify="center"
            align="middle"
            style={{
              flexDirection: 'column',
              display: !record?.monthly_result[monthIndex] ? 'none' : '',
            }}
          >
            <Text>{record?.monthly_result[monthIndex]?.target}</Text>
            <Text>{record?.monthly_result[monthIndex]?.result}</Text>
            <Text>{`${Number(record?.monthly_result[monthIndex]?.achievement).toFixed(2)}%`}</Text>
            <Text>{`${Number(record?.monthly_result[monthIndex]?.score).toFixed(2)}`}</Text>
            {handleResultIndicator(record?.monthly_result[monthIndex]?.achievement)}
          </Row>
        ),
      })),
    },
    {
      title: 'Annual ACC',
      dataIndex: 'average_achievement',
      key: 'annual_acc',
      align: 'center',
    },
  ]
}
