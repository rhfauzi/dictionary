import React, { useState, useEffect } from 'react'
import { Button, Table } from 'pink-lava-ui'
import { Col, Row } from 'antd'
import { FloatAction, Pagination } from 'src/components'
import { getListCountry } from 'src/api/country'
import { EmptyState } from 'src/containers/Layouts/EmptyPagesLayout/emptyState'
import { columns } from '../columns'
import { useCountryContext } from '../states'

export default function SectionTable() {
  const {
    state: { datas, selectedRowKeys, filters },
    handler,
  } = useCountryContext()
  const { handleDatas, handleSelectedRowKeys, handleConfirm } = handler

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
    await getListCountry({
      limit: pagins?.limit_per_page ?? 20,
      page: pagins?.current_page ?? 1,
      search: filters?.search ?? '',
    })
      .then((res: any) => {
        handleDatas(res ?? { data: [] })
        setPagin(res?.pagination ?? {
          ...pagin,
          current_page: 1,
          total_page: 1,
          total_rows: 1,
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetDataTable(pagin)
    setPayloadEmpty({
      title: 'No Data Country',
      subtitle: 'data is not available at this time',
    })
  }, [])

  useEffect(() => {
    if (filters !== undefined) {
      handleGetDataTable({
        ...pagin,
        current_page: 1,
      })
    }
    if (datas?.data?.length <= 0) {
      setPayloadEmpty({
        title: 'The data are you looking for cannot be found',
        subtitle: 'Try another Country Name.',
      })
    }
  }, [filters?.search])

  return (
    <>
      <Table
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

      {hasData
        && <Pagination
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
      }

      {selectedRowKeys?.length > 0 && (
        <FloatAction>
          <Row justify="space-between" style={{ flexGrow: 1 }}>
            <b style={{ lineHeight: '48px' }}>
              {selectedRowKeys?.length} Country are Selected
            </b>
            <Row gutter={10}>
              <Col>
                <Button
                  size="big"
                  variant="secondary"
                  onClick={() => {
                    handleConfirm(undefined)
                    handleSelectedRowKeys([])
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  size="big"
                  variant="tertiary"
                  onClick={() => {
                    handleConfirm('delete')
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