import React, { useState, useEffect } from 'react'
import { Button, Table } from 'pink-lava-ui'
import { Col, Row } from 'antd'
import { FloatAction, Pagination } from 'src/components'
import { EmptyState } from 'src/containers/Layouts/EmptyPagesLayout/emptyState'
import { getListSubJobFamily } from 'src/api/sub-job-family'
import { getListJobFamily } from 'src/api/job-family'
import { columns } from '../columns'
import { useSubJobFamilyContext } from '../states'

export default function SectionTable() {
  const {
    state: { datas, selectedRowKeys, filters },
    handler,
  } = useSubJobFamilyContext()
  const { handleDatas, handleSelectedRowKeys, handleConfirm, handleOptionJobFamily } = handler

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

  const handleGetOptionJobFamily = async () => {
    setLoading(true)
    await getListJobFamily({})
      .then((res: any) => {
        const optionJobFamily = res?.data?.map((item: any) => ({
          id: item.code,
          label: item.name,
          value: item.code,
        }))
        handleOptionJobFamily(optionJobFamily ?? { data: [] })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  const handleGetDataTable = async (pagins: any) => {
    setLoading(true)
    await getListSubJobFamily({
      limit: pagins?.limit_per_page ?? 20,
      page: pagins?.current_page ?? 1,
      search: filters?.search ?? '',
    })
      .then((res: any) => {
        handleDatas(res ?? { data: [] })
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
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    handleGetDataTable(pagin)
    handleGetOptionJobFamily()
    setPayloadEmpty({
      title: 'No Data Sub Job Family',
      subtitle: 'data is not available at this time',
    })
  }, [])

  useEffect(() => {
    if (filters?.search?.length === 0 || filters?.search?.length > 3) {
      handleGetDataTable({
        ...pagin,
        current_page: 1,
      })
    }
    if (datas?.data?.length <= 0) {
      setPayloadEmpty({
        title: 'The data are you looking for cannot be found',
        subtitle: 'Try another Sub Job Family Name.',
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
            setTimeout(
              () =>
                handleGetDataTable({
                  ...pagin,
                  current_page,
                  limit_per_page,
                }),
              300,
            )
          }}
        />
      )}

      {selectedRowKeys?.length > 0 && (
        <FloatAction>
          <Row justify="space-between" style={{ flexGrow: 1 }}>
            <b style={{ lineHeight: '48px' }}>{selectedRowKeys?.length} Sub Job Family are Selected</b>
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
