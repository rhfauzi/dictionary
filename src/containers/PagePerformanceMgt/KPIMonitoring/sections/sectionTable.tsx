import { CalendarOutlined, FilterFilled, InfoCircleFilled } from '@ant-design/icons'
import { Col, DatePicker, Row, Select, Tooltip } from 'antd'
import { RangePickerProps } from 'antd/lib/date-picker'
import Table, { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { Spacer, Text } from 'pink-lava-ui'
import { useEffect, useState } from 'react'
import { getListKPIMonitoring } from 'src/api/kpi-monitoring'
import { DebounceSelect } from 'src/components'
import { COLORS } from 'src/const/COLORS'
import { EmptyState } from 'src/containers/Layouts/EmptyPagesLayout/emptyState'
import styled from 'styled-components'
import { columns } from '../columns'
import { useKPIMonitoringContext } from '../states'
import { ICArrowDown } from 'src/assets'

const years_option = [
  {
    value: 2024,
    label: '2024',
  },
  {
    value: 2023,
    label: '2023',
  },
  {
    value: 2022,
    label: '2022',
  },
  {
    value: 2021,
    label: '2021',
  },
  {
    value: 2020,
    label: '2020',
  },
  {
    value: 2019,
    label: '2019',
  },
  {
    value: 2018,
    label: '2018',
  },
]

export default function SectionTable() {
  const {
    state: { datas, filters, refetch },
    handler,
  } = useKPIMonitoringContext()
  const { handleDatas, handleModal, handleFilters, handleReFetch } = handler

  const [loading, setLoading] = useState(false)
  const [pagin, setPagin] = useState<any>({
    limit_per_page: 20,
    current_page: 1,
    total_page: 1,
    total_rows: 1,
  })
  const [payloadEmpty, setPayloadEmpty] = useState({
    title: '',
    subtitle: '',
  })
  const [filterFields, setFilterFields] = useState<any>({
    year: '',
    month_from: '',
    month_to: '',
  })
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < moment(filterFields?.month_from).endOf('day')
  }

  const styles = { width: 8, height: 8, borderRadius: 10 }
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
  const handleGetDataTable = async (pagins: any) => {
    setLoading(true)
    await getListKPIMonitoring({
      year: filters?.year ?? '',
      month_from: filters?.month_from ?? '',
      month_to: filters?.month_to ?? '',
    })
      .then((res: any) => {
        handleDatas(res ?? { data: [] })
        setPagin(
          res?.pagination ?? {
            ...pagin,
          },
        )
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetDataTable(pagin)
    setPayloadEmpty({
      title: 'No Data KPI Monitoring',
      subtitle: 'data is not available at this time',
    })
  }, [])

  useEffect(() => {
    if (filters?.year || (filters?.month_from && filters?.month_to)) {
      handleGetDataTable({ ...pagin })
    }
    if (datas?.data?.length <= 0) {
      setPayloadEmpty({
        title: 'The data are you looking for cannot be found',
        subtitle: 'Try another KPI Monitoring.',
      })
    }
  }, [filters])

  return (
    <>
      <Row justify={'space-between'}>
        <Col md={16} sm={24} xs={24}>
          <Row align={'middle'}>
            <Text variant="label" style={{ marginTop: 10 }}>
              Filter Data
            </Text>
            <Spacer size={15} />
            <Row
              style={{
                border: `2px solid ${COLORS.grey.lighter}`,
                borderRadius: '10rem',
                width: '10rem',
                padding: '0px 8px',
                marginTop: 10,
              }}
            >
              <CalendarOutlined />
              <Select
                value={filters?.year}
                placeholder="Select Year"
                allowClear
                style={{ border: 'none', flexGrow: 1 }}
                suffixIcon={<ICArrowDown />}
                onChange={(e) => {
                  handleFilters('year', e)
                  if (!e) {
                    handleReFetch(!refetch)
                  }
                }}
                options={years_option}
              />
            </Row>
            <Spacer size={10} />
            <Row align="middle" style={{ marginTop: 10 }}>
              {/* <CustomDatePicker /> */}
              <CustomDatePicker
                picker="month"
                format="MMMM"
                allowClear
                value={filterFields?.month_from}
                style={{ borderRadius: '100px !important;', height: '2.5rem', width: '10rem' }}
                onChange={(e) => {
                  setFilterFields((prev) => ({ ...prev, month_from: e }))
                  handleFilters('month_from', e?.format('MMMM').toLowerCase())
                  if (!e) {
                    handleReFetch(!refetch)
                  }
                }}
              />
              <Spacer size={10} />
              <Text style={{ color: COLORS.grey.regular }}>to</Text>
              <Spacer size={10} />
              {/* <CustomDatePicker /> */}
              <CustomDatePicker
                picker="month"
                format="MMMM"
                value={filterFields?.month_to}
                allowClear
                style={{ borderRadius: '100px !important;', height: '2.5rem', width: '10rem' }}
                onChange={(e) => {
                  setFilterFields((prev) => ({ ...prev, month_to: e }))
                  handleFilters('month_to', e?.format('MMMM').toLowerCase())
                  if (!e) {
                    handleReFetch(!refetch)
                  }
                }}
              />
            </Row>
          </Row>
        </Col>
        <Col xl={6} md={12} sm={12} xs={12} style={{ marginTop: 10 }}>
          <Row justify={'center'} align={'middle'}>
            <Tooltip title="Score Definition">
              <div
                onClick={() => handleModal('create')}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 35,
                  height: 35,
                  background: COLORS.blue.lightest,
                  borderRadius: 20,
                  cursor: 'pointer',
                  marginRight: 10,
                }}
              >
                <InfoCircleFilled style={{ color: COLORS.blue.regular }} />
              </div>
            </Tooltip>
            <Row
              justify={'center'}
              align={'middle'}
              style={{
                background: COLORS.blue.lightest,
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                flexGrow: 1,
                width: '75%',
              }}
            >
              <Text style={{ color: COLORS.blue.regular, fontWeight: 'bold' }}>
                Total Weight Remaining: Yearly (0%)
              </Text>
            </Row>
          </Row>
        </Col>
      </Row>
      <Spacer size={10} />
      <Table
        rowKey={'id'}
        dataSource={datas?.kpi_data ?? []}
        columns={columns(handler) as ColumnsType}
        loading={loading}
        size="small"
        scroll={{ x: 'max-content' }}
        showSorterTooltip={true}
        pagination={false}
        locale={{
          emptyText: <EmptyState {...payloadEmpty} />,
        }}
        summary={(e) => {
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4} rowSpan={2}>
                  Total Score
                </Table.Summary.Cell>
                {datas?.total_score?.monthly?.map((item, index) => (
                  <Table.Summary.Cell index={index}>
                    <Text style={{ textAlign: 'center', width: '100%' }}>{item.score}</Text>
                  </Table.Summary.Cell>
                ))}
                <Table.Summary.Cell index={datas?.total_score?.monthyly?.length + 1}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {datas?.average_achievement?.yearly}
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                {datas?.average_achievement?.monthly?.map((item, i) => (
                  <Table.Summary.Cell index={i}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {handleResultIndicator(item.score)}
                    </div>
                  </Table.Summary.Cell>
                ))}
                <Table.Summary.Cell index={datas?.average_achievement?.monthly?.length + 1}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {handleResultIndicator(datas?.average_achievement?.yearly)}
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )
        }}
      />
    </>
  )
}

const CustomDatePicker = styled(DatePicker)`
  && {
    border-radius: 100px !important;
  }
  .ant-picker {
    border-radius: 100px !important;
  }
`
