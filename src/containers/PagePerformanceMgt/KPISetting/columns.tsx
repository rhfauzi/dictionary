import { addColumn } from 'src/utils/createColumns'
import { Button, Text } from 'pink-lava-ui'
import { Switch, Col, Row } from 'antd'
import { baseHandler } from './states/handler'
import { COLORS } from 'src/const/COLORS'
import { getListKPISettingById } from 'src/api/kpi-settings'

export function columns(handler: ReturnType<typeof baseHandler>) {
  const { handleDataForm, handleModal, handleDatas, runProcess, stopProcess } = handler
  const handleGetKPISettingById = async (payload: any) => {
    console.log('payload', payload)
    // handleDataForm({})
    // handleModal('details')
    runProcess('Wait for updating KPI Setting')
    stopProcess()
    await getListKPISettingById(payload)
      .then((res: any) => {
        console.log(res)
        if (res.status === 200) {
          console.log('masuk')
          handleDataForm(res?.data?.data ?? { data: {} })
          handleModal('details')
        } else {
          handleModal('details')
        }
        stopProcess()
      })
      .catch((error) => {
        handleModal('details')
        stopProcess()
      })
  }
  const handleAction = (record: any) => {
    handleGetKPISettingById(record)
    // handleDataForm({})
    // handleModal('create')
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return [
    {
      title: 'No.',
      dataIndex: 'no',
      width: 5,
    },
    {
      title: 'Key Performance Indicators',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: (
        <Text variant="label" style={{ fontWeight: '600', fontSize: '11px' }}>
          UOM
        </Text>
      ),
      dataIndex: 'uom',
      width: 65,
    },
    {
      title: (
        <Text variant="label" style={{ fontWeight: '600', fontSize: '11px' }}>
          Weight
        </Text>
      ),
      dataIndex: 'weight',
      width: 65,
    },
    {
      title: (
        <Text variant="label" style={{ fontWeight: '600', fontSize: '11px' }}>
          Target
        </Text>
      ),
      dataIndex: 'target',
      width: 65,
    },
    {
      title: 'Effective Date',
      dataIndex: 'effective_date',
      width: 65,
    },
    {
      title: 'Expired Date',
      dataIndex: 'expired_date',
      width: 65,
    },
    {
      title: (
        <Text variant="label" style={{ fontWeight: '600', fontSize: '11px' }}>
          Value Type
        </Text>
      ),
      dataIndex: 'value_type',
      width: 65,
    },
    {
      title: 'Approval',
      dataIndex: 'approval_status',
      width: 80,
      render: (approval_status: string) => (
        <Row
          align="middle"
          justify="center"
          style={{
            background:
              approval_status === 'unapproved' ? COLORS.red.lightest : COLORS.green.lightest,
            padding: '0.3rem',
            borderRadius: '4px',
            width: '5rem'
          }}
        >
          <Text
            variant="label"
            style={{
              fontWeight: '600',
              fontSize: '11px',
              color: approval_status === 'unapproved' ? COLORS.red.regular : COLORS.green.regular,
            }}
          >
            {capitalizeFirstLetter(approval_status)}
          </Text>
        </Row>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: true,
      width: 90,
      // render: (text: string, record: any) => (
      //   <>
      //     {text !== '' ? (
      //       <Button
      //         className="hc-button-tertiary"
      //         size="small"
      //         variant="tertiary"
      //         onClick={() => handleAction(record)}
      //       >
      //         View Detail
      //       </Button>
      //     ) : (
      //       ''
      //     )}
      //   </>
      // ),
      render: (text: string, record: any) => (
        <>
          {text !== '' ? (
            <Button
              className="hc-button-tertiary"
              size="small"
              variant="tertiary"
              onClick={() => handleAction(record)}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 10, color: COLORS.blue.regular }}>
                View Detail
              </Text>
            </Button>
          ) : (
            ''
          )}
        </>
      ),
    },
  ]
}
