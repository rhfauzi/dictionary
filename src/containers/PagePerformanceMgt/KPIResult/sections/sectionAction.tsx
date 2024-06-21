import { Col, Row } from 'antd'
import { useRouter } from 'next/router'
import { Spacer, Text } from 'pink-lava-ui'
import { useState } from 'react'
import { ICArrowLeft } from 'src/assets'
import { Card } from 'src/components'
import { useKPIResultContext } from '../states'

export default function SectionAction() {
  const router = useRouter()
  const {
    state: { refetch },
    handler: { handleModal, handleFilters, handleReFetch, runProcess, stopProcess },
  } = useKPIResultContext()
  const [search, setSearch] = useState<string>('')

  const handleValidation = (val: any) => {
    const regex = /[^a-z\d\-_\s]+/i
    const tes = val.match(regex)
    if (tes?.length <= 0 || tes === null) {
      setSearch(val)
      handleFilters('search', val)
    }
  }

  return (
    <>
      <Spacer size={16} />
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row gutter={[10, 10]} justify="space-between">
          <Col md={16} sm={24} xs={24}>
            <Row align="middle">
              <ICArrowLeft
                onClick={() => router.push('/performance-management')}
                style={{ cursor: 'pointer' }}
              />
              <Text variant="headingLarge" style={{ fontWeight: 'bold', color: '#444444' }}>
                KPI Result
              </Text>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  )
}
