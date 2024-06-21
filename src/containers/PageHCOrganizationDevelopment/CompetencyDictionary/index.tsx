import React, { useState } from 'react'
import { Card, Row, Col } from 'antd'
import { Spacer, Text, Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { ICArrowLeft, ICAngleSmallRight } from 'src/assets'
import { ILHCWFH, ILHCWFO } from 'src/assets/ilustration'
import CompetencyAnalysis from './CompetencyAnalysis'

const CompetencyDictionary = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <Spacer size={20} />
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row align="middle" justify="space-between">
          <Row align="middle">
            <ICArrowLeft
              onClick={() => router.push('/organization-development')}
              style={{ cursor: 'pointer' }}
            />
            <Text variant="headingLarge" style={{ fontWeight: 'bold', color: '#444444' }}>
              Competency Dictionary
            </Text>
          </Row>
        </Row>
      </Card>

      <Spacer size={20} />
      <Row gutter={[20, 20]} align="middle">
        <Col xs={24} xl={12}>
          <Card style={{ borderRadius: 20, flex: 1, minHeight: '203px' }}>
            <Row>
              <Col span={6}>
                <div
                  style={{
                    width: '100%;',
                    height: '127px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '0px 20px 0px 0px',
                  }}
                >
                  <ILHCWFH />
                </div>
              </Col>
              <Col span={18}>
                <Text variant="headingLarge">Competency Analysis</Text>
                <Text variant="subtitle1">Feedback or comments given on employee performance or work. The ability or skill that a person has to complete a task or job.</Text>
                <Button
                  size="big"
                  variant="tertiary"
                  onClick={() => setShowModal(true)}
                  style={{
                    marginTop: '10px',
                    border: '2px solid #2771c7',
                    color: '#2771c7',
                  }}
                >
                  Start <ICAngleSmallRight style={{ cursor: 'pointer' }} />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} xl={12}>
          <Card style={{ borderRadius: 20, flex: 1, minHeight: '203px' }}>
            <Row>
              <Col span={6}>
                <div
                  style={{
                    width: '100%;',
                    height: '127px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '0px 20px 0px 0px',
                  }}
                >
                  <ILHCWFO />
                </div>
              </Col>
              <Col span={18}>
                <Text variant="headingLarge">Dictionary</Text>
                <Text variant="subtitle1">Organizations can identify areas where the dictionary can be improved and ensure that it is aligned with their goals and objectives.</Text>
                <Button
                  size="big"
                  variant="tertiary"
                  onClick={() => router.push(`${router.pathname}/dictionary`)}
                  style={{
                    marginTop: '10px',
                    border: '2px solid #2771c7',
                    color: '#2771c7',
                  }}
                >
                  View <ICAngleSmallRight style={{ cursor: 'pointer' }} />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <CompetencyAnalysis
        showModal={showModal}
        onCancel={setShowModal}
      />
    </>
  )
}

export default CompetencyDictionary