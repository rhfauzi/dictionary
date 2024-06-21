import React, { useState } from 'react'
import { Button, Spacer, Text } from 'pink-lava-ui'
import { Col, Row, Input } from 'antd'
import { Card } from 'src/components'
import { ICSearch, ICArrowLeft } from 'src/assets'
import { useRouter } from 'next/router'
import { useDictionaryContext } from '../states'
import CompetencyAnalysis from '../../CompetencyAnalysis'

export default function SectionAction() {
  const router = useRouter()
  const {
    state: { refetch },
    handler: { handleFilters, handleReFetch },
  } = useDictionaryContext()
  const [search, setSearch] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

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
                onClick={() => router.push('/organization-development/competency-dictionary')}
                style={{ cursor: 'pointer' }}
              />
              <Text variant="headingLarge" style={{ fontWeight: 'bold', color: '#444444' }}>
                Dictionary
              </Text>

              <Input
                required
                type="select"
                placeholder="Search Dictionary Name"
                value={search}
                onChange={(e: any) => {
                  handleValidation(e?.target?.value)
                  if (e === undefined) { handleReFetch(!refetch) }
                }}
                style={{
                  width: '248px',
                  height: '36px',
                  fontSize: '14px',
                  paddingTop: '4px',
                  border: '1px solid rgb(170, 170, 170)',
                  borderRadius: '64px',
                  marginLeft: '16px',
                }}
                prefix={<ICSearch />}
              />
            </Row>
          </Col>
          <Col md={8} sm={24} xs={24} style={{ display: 'flex', justifyContent: 'end' }}>
            <Button
              size="big"
              variant="primary"
              className='hc-button'
              onClick={() => {
                setShowModal(true)
              }}
              style={{ marginRight: '20px', height: '36px' }}
            >
              Create
            </Button>
          </Col>
        </Row>
      </Card>

      <CompetencyAnalysis
        showModal={showModal}
        onCancel={setShowModal}
      />
    </>
  )
}