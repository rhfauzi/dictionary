import React, { useState, useEffect } from 'react'
import { Button, Table } from 'pink-lava-ui'
import { Col, Row } from 'antd'
import { FloatAction, Pagination } from 'src/components'
import { EmptyState } from 'src/containers/Layouts/EmptyPagesLayout/emptyState'
import { columns } from '../columns'
import { useJobCodeContext } from '../states'
import { getListJobCode } from 'src/api/job-code'
import { getListJobTitle } from 'src/api/job-title'
import { getListLegalEntity } from 'src/api/legal-entity'
import { getListCountry } from 'src/api/country'
import { getListJobFamily } from 'src/api/job-family'
import { getListSubJobFamily } from 'src/api/sub-job-family'
import { getListJobGrade } from 'src/api/job-grade'

export default function SectionTable() {
  const {
    state: { datas, selectedRowKeys, filters },
    handler,
  } = useJobCodeContext()
  const {
    handleDatas,
    handleSelectedRowKeys,
    handleConfirm,
    handleDataOptJobTitle,
    handleDataOptLegalEntity,
    handleDataOptCountry,
    handleDataOptJobFamily,
    handleDataJobFamily,
    handleDataOptSubJobFamily,
    handleDataOptJobGrade,
  } = handler

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

  // Option job title dropdown for create / update modal
  const handleGetOptJobTitle = async () => {
    return new Promise((resolve) => {
      getListJobTitle({})
        .then((res: any) => {
          let option = res?.data?.map((opt: any) => {
            return { value: opt?.code, label: opt?.name }
          })
          resolve(option ?? { data: [] })
          setLoading(false)
        })
        .catch((error) => {
          resolve([])
          setLoading(false)
        })
    })
  }

  // Option legal entity dropdown for create / update modal
  const handleGetOptLegalEntity = async () => {
    return new Promise((resolve) => {
      getListLegalEntity({})
        .then((res: any) => {
          let option = res?.data?.map((opt: any) => {
            return { value: opt?.code, label: opt?.name }
          })
          resolve(option ?? { data: [] })
          setLoading(false)
        })
        .catch((error) => {
          resolve([])
          setLoading(false)
        })
    })
  }

  // Option country dropdown for create / update modal
  const handleGetOptCountry = async () => {
    return new Promise((resolve) => {
      getListCountry({})
        .then((res: any) => {
          let option = res?.data?.map((opt: any) => {
            return { value: opt?.code, label: opt?.name }
          })
          resolve(option ?? { data: [] })
          setLoading(false)
        })
        .catch((error) => {
          resolve([])
          setLoading(false)
        })
    })
  }

  // Option job family dropdown for create / update modal
  const handleGetOptJobFamily = async () => {
    return new Promise((resolve) => {
      getListJobFamily({})
        .then((res: any) => {
          handleDataJobFamily(res?.data ?? { data: [] })
          let option = res?.data?.map((opt: any) => {
            return { value: opt?.code, label: opt?.name }
          })
          resolve(option ?? { data: [] })
          setLoading(false)
        })
        .catch((error) => {
          resolve([])
          setLoading(false)
        })
    })
  }

  // Option sub job family dropdown for create / update modal
  const handleGetOptSubJobFamily = async () => {
    return new Promise((resolve) => {
      getListSubJobFamily({})
        .then((res: any) => {
          let option = res?.data?.map((opt: any) => {
            return { value: opt?.code, label: opt?.name }
          })
          resolve(option ?? { data: [] })
          setLoading(false)
        })
        .catch((error) => {
          resolve([])
          setLoading(false)
        })
    })
  }

  // Option job grade dropdown for create / update modal
  const handleGetOptJobGrade = async () => {
    return new Promise((resolve) => {
      getListJobGrade({})
        .then((res: any) => {
          let option = res?.data?.map((opt: any) => {
            return { value: opt?.id, label: opt?.name }
          })
          resolve(option ?? { data: [] })
          setLoading(false)
        })
        .catch((error) => {
          resolve([])
          setLoading(false)
        })
    })
  }
  const handleGetDataTable = async (pagins: any) => {
    setLoading(true)
    await getListJobCode({
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
      .catch((error) => {
        setLoading(false)
      })
  }

  const fetchAllOpt = async () => {
    setLoading(true)
    const [
      dataOptJobTitle,
      dataOptLegalEntity,
      dataOptCountry,
      dataOptJobFamily,
      dataOptSubJobFamily,
      dataOptJobGrade,
    ] = await Promise.all([
      handleGetOptJobTitle(),
      handleGetOptLegalEntity(),
      handleGetOptCountry(),
      handleGetOptJobFamily(),
      handleGetOptSubJobFamily(),
      handleGetOptJobGrade(),
    ])
    handleDataOptJobTitle(dataOptJobTitle ?? { data: [] })
    handleDataOptLegalEntity(dataOptLegalEntity ?? { data: [] })
    handleDataOptCountry(dataOptCountry ?? { data: [] })
    handleDataOptJobFamily(dataOptJobFamily ?? { data: [] })
    handleDataOptSubJobFamily(dataOptSubJobFamily ?? { data: [] })
    handleDataOptJobGrade(dataOptJobGrade ?? { data: [] })
  }

  useEffect(() => {
    handleGetDataTable(pagin)
    fetchAllOpt()
    setPayloadEmpty({
      title: 'No Data Job Code',
      subtitle: 'data is not available at this time',
    })
  }, [])

  useEffect(() => {
    if (filters?.search?.length === 0 || filters?.search?.length > 3) {
      handleGetDataTable({ ...pagin, current_page: 1 })
    }
    if (datas?.data?.length <= 0) {
      setPayloadEmpty({
        title: 'The data are you looking for cannot be found',
        subtitle: 'Try another Job Code.',
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
            setTimeout(() => handleGetDataTable({ ...pagin, current_page, limit_per_page }), 300)
          }}
        />
      )}

      {selectedRowKeys?.length > 0 && (
        <FloatAction>
          <Row justify="space-between" style={{ flexGrow: 1 }}>
            <b style={{ lineHeight: '48px' }}>{selectedRowKeys?.length} Job Code are Selected</b>
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
