import React, { useState, useEffect } from 'react'
import { Button, Table, Text, Spacer } from 'pink-lava-ui'
import { Col, Row, Select } from 'antd'
import { DebounceSelect, FloatAction, Pagination } from 'src/components'
import { EmptyState } from 'src/containers/Layouts/EmptyPagesLayout/emptyState'
import { columns } from '../columns'
import { useKPISettingContext } from '../states'

import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { getListKPISetting } from 'src/api/kpi-settings'
import { ICArrowDown } from 'src/assets'
import moment from 'moment'
import { CalendarOutlined } from '@ant-design/icons'

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
    state: { datas, selectedRowKeys, filters, refetch },
    handler,
  } = useKPISettingContext()
  const { handleDatas, handleSelectedRowKeys, handleConfirm, handleFilters, handleReFetch } =
    handler

  const [totalYear, setTotalYear] = useState<any>('')
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

  // get list master kpi setting
  const handleGetDataTable = async (pagins: any) => {
    setLoading(true)
    await getListKPISetting({
      limit: pagins?.limit_per_page ?? 20,
      page: pagins?.current_page ?? 1,
      year: filters?.year ?? '',
    })
      .then((res: any) => {
        handleDatas(res ?? { data: [] })
        console.log(res)
        if (res?.data?.length > 0) {
          let totalWeight = res?.data?.map((item) => item.weight).reduce((sum, num) => sum + num)
          console.log('totalWeight', totalWeight)
          setTotalYear(totalWeight ?? '-')
        } else {
          setTotalYear('-')
        }
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
    handleFilters('year', moment().year() ?? null)
    handleGetDataTable(pagin)
    setPayloadEmpty({
      title: 'No Data KPI Settings',
      subtitle: 'data is not available at this time',
    })
  }, [])

  useEffect(() => {
    if (filters !== undefined) {
      handleGetDataTable({ ...pagin, current_page: 1 })
    }
    if (datas?.data?.length <= 0) {
      setPayloadEmpty({
        title: 'The data are you looking for cannot be found',
        subtitle: 'Try another KPI Settings.',
      })
    }
  }, [filters?.year])

  return (
    <>
      <Row justify={'space-between'}>
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
        <Row
          justify={'center'}
          align={'middle'}
          style={{ background: COLORS.blue.lightest, padding: '0.5rem 1rem', borderRadius: '8px' }}
        >
          <Text style={{ color: COLORS.blue.regular, fontWeight: 'bold' }}>
            {`Total Weight Remaining: Yearly (${totalYear})%`}
          </Text>
        </Row>
      </Row>
      <Spacer size={10} />
      <CustomTable
        rowKey={'code'}
        dataSource={datas?.data ?? []}
        columns={columns(handler)}
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

      {selectedRowKeys?.length > 0 && (
        <FloatAction>
          <Row justify="space-between" style={{ flexGrow: 1 }}>
            <b style={{ lineHeight: '48px' }}>{selectedRowKeys?.length} Master KPI are Selected</b>
            <Row gutter={10}>
              <Col>
                <Button
                  type="ghost"
                  shape="round"
                  size="large"
                  onClick={() => {
                    handleConfirm('delete')
                  }}
                  style={{
                    border: `2px solid ${COLORS.red.regular}`,
                    color: COLORS.red.regular,
                    fontWeight: 'bold',
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Row>
        </FloatAction>
      )}
    </>
  )
}

const CustomTable = styled(Table)`
  .ant-checkbox-inner {
    color: red;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background: ${COLORS.blue.regular};
    border: 2px solid ${COLORS.blue.regular} !important;
  }
`
