import { Card, Row, Col } from 'antd'
import { Spacer, Text, Button } from 'pink-lava-ui'
import { useRouter } from 'next/router'
import { ICArrowLeft, ICAngleSmallRight } from 'src/assets'
import { ILJobAnalysis, ILJobEvaluation } from 'src/assets/ilustration'

const JobAnalysisAndEvaluation = () => {
  const router = useRouter()

  return (
    <div style={{ height: '85vh' }}>
    <Spacer size={20} />
      <Card style={{ borderRadius: 8, flex: 1 }}>
        <Row align="middle" justify="space-between">
          <Row align="middle">
            <ICArrowLeft
              onClick={() => router.push('/organization-development')}
              style={{ cursor: 'pointer' }}
            />
            <Text variant="headingLarge" style={{ fontWeight: 'bold', color: '#444444' }}>
              Job Analysis & Evaluation
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
                  <ILJobAnalysis />
                </div>
              </Col>
              <Col span={18}>
                <Text variant="headingLarge">Job Analysis</Text>
                <Text variant="subtitle1">The process of identifying and documenting the tasks, duties, and requirements of job.</Text>
                <Button
                  size="big"
                  variant="tertiary"
                  onClick={() => router.push(`${router.pathname}/job-analysis`)}
                  style={{
                    marginTop: '10px',
                    border: '2px solid #2771c7',
                    color: '#2771c7',
                  }}
                >
                  Start Analysis <ICAngleSmallRight style={{ cursor: 'pointer' }} />
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
                  <ILJobEvaluation />
                </div>
              </Col>
              <Col span={18}>
                <Text variant="headingLarge">Job Evaluation</Text>
                <Text variant="subtitle1">The process of determining the relative worth of a job compared to other jobs within an organization.</Text>
                <Button
                  size="big"
                  variant="tertiary"
                  // onClick={() => router.push(`${router.pathname}/job-evaluation`)}
                  style={{
                    marginTop: '10px',
                    border: '2px solid #2771c7',
                    color: '#2771c7',
                  }}
                >
                  Start Evaluation <ICAngleSmallRight style={{ cursor: 'pointer' }} />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default JobAnalysisAndEvaluation