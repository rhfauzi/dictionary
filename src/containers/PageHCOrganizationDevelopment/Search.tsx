import React, { useEffect, useState } from 'react'
import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { Loader, Pagination } from 'src/components'
import { Spacer, Text } from 'pink-lava-ui'
import { Button, Card, Col, Row, Typography } from 'antd'
import { ICArrowLeft } from 'src/assets'
import { FilterEmployeeAPI } from 'src/api/filters/employee'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

const PageODOrganizationStructureSearchAllEmployee = () => {
  const router = useRouter()
  const { search: searchParam } = router?.query

  const [loading, setLoading] = useState<boolean>(false)
  const [pagin, setPagin] = useState<any>({
    limit_per_page: 20,
    current_page: 1,
    total_page: 1,
    total_rows: 1,
  })

  /**
   * @description
   * Fetch filters employee api from epc
   */
  const {
    data: DataEm,
    refetch,
    isFetching,
  } = FilterEmployeeAPI?.hooks?.GetList({
    search: searchParam,
    limit: pagin?.limit_per_page?.toString(),
    page: pagin?.current_page?.toString(),
    onSuccess(e) {
      setPagin(e?.pagination)
      setLoading(false)
    },
  })
  const DataEmployee = DataEm?.data

  const hasData = DataEmployee?.length > 0

  useEffect(() => {
    refetch()
  }, [pagin])

  return (
    <>
      <Container>
        <ICArrowLeft onClick={() => router.back()} style={{ cursor: 'pointer' }} />
        <Row>
          <Text variant="headingLarge">Search Result</Text>
          <Text variant="headingLarge">{` ${searchParam ? `"${searchParam}"` : '"All"'}`}</Text>
        </Row>
      </Container>
      <Spacer size={25} />
      {isFetching ? (
        <Loader />
      ) : (
        <div>
          {hasData ? (
            <>
              {DataEmployee?.map((item) => (
                <>
                  <Card key={item.id} style={{ borderRadius: '4px' }}>
                    <Row style={{ flex: 1, display: 'flex' }} align="middle">
                      <div style={{ width: 50, height: 50, overflow: 'hidden', borderRadius: 100 }}>
                        <Image
                          unoptimized
                          loader={() => item?.image_url ?? '/hc/images/vacant-default.png'}
                          src={item?.image_url ?? '/hc/images/vacant-default.png'}
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <Spacer size={25} />
                      <Col style={{ flex: 1 }}>
                        <Text
                          variant="headingMedium"
                          style={{
                            color: item?.employee_name ? COLORS.blue.regular : COLORS.red.regular,
                          }}
                        >
                          {item.employee_name ? item.employee_name : 'Vacant'}
                        </Text>
                        <Text variant="label" style={{ color: COLORS.grey.regular }}>
                          {item.job_title}
                        </Text>
                        <Text variant="label" style={{ color: COLORS.grey.regular }}>
                          {item.company_name}
                        </Text>
                      </Col>
                      <Link
                        href={{
                          pathname: `/organization-development/org-structure`,
                          query: { id: item.id },
                        }}
                      >
                        <Row
                          align="middle"
                          justify="center"
                          style={{
                            border: `0.1rem solid ${COLORS.blue.regular}`,
                            borderRadius: '96px',
                            width: '8rem',
                            height: '2rem',
                            cursor: 'pointer',
                          }}
                        >
                          <Text style={{ color: COLORS.blue.regular }}>View Structure</Text>
                        </Row>
                      </Link>
                    </Row>
                  </Card>
                  <Spacer size={10} />
                </>
              ))}
            </>
          ) : (
            <Row align={'middle'} justify={'center'}>
              {searchParam ? <Text>{`Data is not found.`}</Text> : <Text>{`Data is empty.`}</Text>}
            </Row>
          )}
        </div>
      )}
      <Spacer size={75} />
      <div style={{ background: COLORS.white, padding: '0.1px 1rem', borderRadius: '8px' }}>
        {hasData && (
          <Pagination
            page={pagin?.current_page}
            limit={pagin?.limit_per_page}
            defaultPageSize={20}
            pageSizeOptions={[10, 20, 40, 60, 80, 100]}
            total={pagin?.total_rows}
            totalPage={pagin?.total_page}
            // onChange={e => console.log(e)}
            onChange={(current_page: any, limit_per_page: any) => {
              console.log(current_page)
              console.log(limit_per_page)
              setPagin({ ...pagin, current_page, limit_per_page })
            }}
          />
        )}
      </div>
    </>
  )
}

export default PageODOrganizationStructureSearchAllEmployee

const Container = styled.div`
  background: ${COLORS.white};
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding: 16px;
`
