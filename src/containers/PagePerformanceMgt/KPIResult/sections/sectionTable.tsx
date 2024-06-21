import React, { useState, useEffect } from 'react'
import { Text, Spacer } from 'pink-lava-ui'
import Table, { ColumnsType } from 'antd/lib/table'
import { Col, Row, Button, Input, Select } from 'antd'
import { FloatAction, Pagination } from 'src/components'
import { EmptyState } from 'src/containers/Layouts/EmptyPagesLayout/emptyState'
import { columnsKPI, columnsPA } from '../columns'
import { useKPIResultContext } from '../states'
import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { CalendarOutlined } from '@ant-design/icons'
import moment from 'moment'
import { ICArrowDown } from 'src/assets'
import { getListKPIResult } from 'src/api/kpi-result'

const years_option = [
  {
    value: '2024',
    label: '2024',
  },
  {
    value: '2023',
    label: '2023',
  },
  {
    value: '2022',
    label: '2022',
  },
  {
    value: '2021',
    label: '2021',
  },
  {
    value: '2020',
    label: '2020',
  },
  {
    value: '2019',
    label: '2019',
  },
  {
    value: '2018',
    label: '2018',
  },
]

export default function SectionTable() {
  const {
    state: { datas, selectedRowKeys, filters, refetch },
    handler,
  } = useKPIResultContext()
  const { handleDatas, handleFilters, handleReFetch } = handler
  const [totalScore, setTotalScore] = useState<any>(null)
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
  const hasData = datas?.data?.length > 0

  const handleGetDataTable = async (pagins: any) => {
    setLoading(true)
    await getListKPIResult({
      limit: pagins?.limit_per_page ?? 20,
      page: pagins?.current_page ?? 1,
      year: filters?.year ?? '',
    })
      .then((res: any) => {
        handleDatas(res ?? { data: [] })
        console.log(res)
        let total = res?.data?.reduce((sum, item) => sum + item.score, 0)
        setTotalScore(total)
        console.log('total', total)
        setPagin(
          res?.pagination ?? {
            ...pagin,
            current_page: 1,
            total_page: 1,
            total_rows: 1,
          },
        )
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    // setTotalScore(datas?.data?.reduce((sum, item) => sum + item.score, 0))
    handleGetDataTable(pagin)
    setPayloadEmpty({
      title: 'No Data KPI Result',
      subtitle: 'data is not available at this time',
    })
  }, [])

  useEffect(() => {
    if (filters?.year?.length === 0 || filters?.year?.length > 3) {
      handleGetDataTable({ ...pagin, current_page: 1 })
    }
    if (datas?.data?.length <= 0) {
      setPayloadEmpty({
        title: 'The data are you looking for cannot be found',
        subtitle: 'Try another KPI Result.',
      })
    }
    // }, [filters?.year])
  }, [])

  return (
    <>
      <Row justify={'space-between'}>
        <Col>
          <Row
            style={{
              border: `2px solid ${COLORS.grey.lighter}`,
              borderRadius: '10rem',
              width: '10rem',
              padding: '0px 8px',
            }}
          >
            <CalendarOutlined />
            <Select
              defaultValue={moment().year()}
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
          <Spacer size={20} />
          <Text variant="headingMedium" style={{ color: COLORS.blue.regular }}>
            KPI Result {moment().year()}
          </Text>
        </Col>
      </Row>
      <Spacer size={10} />
      <Table
        rowKey={'code'}
        dataSource={datas?.data ?? []}
        columns={columnsKPI(handler) as ColumnsType}
        loading={loading}
        scroll={{ x: 'max-content', y: 600 }}
        showSorterTooltip={true}
        size="small"
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: (selected: any) => handleSelectedRowKeys(selected),
        // }}
        pagination={false}
        locale={{
          emptyText: <EmptyState {...payloadEmpty} />,
        }}
      />
      <Spacer size={50} />
      <Row justify={'space-between'}>
        <Text variant="headingMedium" style={{ color: COLORS.blue.regular }}>
          PA Result
        </Text>
      </Row>
      <Table
        rowKey={'code'}
        dataSource={datas?.data ?? []}
        columns={columnsPA(handler, totalScore) as ColumnsType}
        loading={loading}
        scroll={{ x: 'max-content', y: 600 }}
        showSorterTooltip={true}
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: (selected: any) => handleSelectedRowKeys(selected),
        // }}
        pagination={false}
        locale={{
          emptyText: <EmptyState {...payloadEmpty} />,
        }}
      />
      {/* <CustomTable
        rowKey={'code'}
        dataSource={datas?.data ?? []}
        columns={columnsPA(handler, totalScore)}
        loading={loading}
        scroll={{ x: 'max-content', y: 600 }}
        showSorterTooltip={true}
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: (selected: any) => handleSelectedRowKeys(selected),
        // }}
        pagination={false}
        locale={{
          emptyText: <EmptyState {...payloadEmpty} />,
        }}
      /> */}

      {hasData && (
        <Pagination
          page={pagin?.current_page}
          limit={pagin?.limit_per_page}
          defaultPageSize={20}
          pageSizeOptions={[10, 20, 40, 60, 80, 100]}
          total={pagin?.total_rows}
          totalPage={pagin?.total_page}
          onChange={(current_page: any, limit_per_page: any) => {
            setPagin({ ...pagin, current_page, limit_per_page })
            setTimeout(() => handleGetDataTable({ ...pagin, current_page, limit_per_page }), 300)
          }}
        />
      )}
    </>
  )
}

const CustomTable = styled(Table)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background: ${COLORS.blue.regular};
    border: 2px solid ${COLORS.blue.regular} !important;
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner {
    border-color: ${COLORS.blue.regular};
  }
`
