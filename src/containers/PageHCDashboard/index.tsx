'use client'

import { Col, Row } from 'antd'
import Image from 'next/image'
import { Card, Spacer, Text } from 'pink-lava-ui'
import { ICWaveHands } from 'src/assets'
import { ILHCMission, ILHCVision } from 'src/assets/ilustration'
import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { tasteMenu } from './Data/MenuData'

const PageHCDashboard = () => {
  return (
    <>
      <Container>
        <Text variant="headingLarge">Welcome to HC</Text>
        <ICWaveHands />
      </Container>
      <Spacer size={50} />
      <Card>
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <Card
              style={{
                background: `linear-gradient(90deg, hsla(216, 97%, 75%, 1) 0%, hsla(212, 67%, 47%, 1) 100%)`,
                height: '11rem',
              }}
            >
              <Row
                align="middle"
                justify="center"
                gutter={[10, 10]}
                style={{ display: 'flex', height: '100%' }}
              >
                <Col
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <div style={{ width: 100, height: 100, flex: 1 }}>
                    <ILHCVision />
                  </div>
                </Col>
                <Spacer style={{ width: 10 }} />
                <Col style={{ flex: 1, display: 'grid' }}>
                  <Text variant="headingMedium" color="white">
                    Vision
                  </Text>
                  <Text
                    variant="subtitle2"
                    color="white"
                    textAlign="justify"
                    style={{ fontSize: '0.6rem' }}
                  >
                    We improve the society's quality of living through the high quality food and
                    beverage production, innovative and oriented to the consumers' need. The all of
                    these are supported any competent human resources to be added value for our
                    stakeholders.
                  </Text>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
            <Card
              style={{
                background: `linear-gradient(90deg, hsla(216, 97%, 75%, 1) 0%, hsla(212, 67%, 47%, 1) 100%)`,
                height: '11rem',
              }}
            >
              <Row
                align="middle"
                justify="center"
                gutter={[10, 10]}
                style={{ display: 'flex', height: '100%' }}
              >
                <Col
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <div style={{ width: 100, height: 100, flex: 1 }}>
                    <ILHCMission />
                  </div>
                </Col>
                <Spacer style={{ width: 10 }} />
                <Col style={{ flex: 1, display: 'grid' }}>
                  <Text variant="headingMedium" color="white">
                    Mission
                  </Text>
                  <Text
                    variant="subtitle2"
                    color="white"
                    textAlign="justify"
                    style={{ fontSize: '0.6rem' }}
                  >
                    We innovate in producing nutritious food and beverages and also provide the
                    added value at every stage of human life.
                  </Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Spacer size={20} />
        <Row>
          <Text variant="headingLarge" color="blue.darker">
            T.A.S.T.E
          </Text>
        </Row>
        <Spacer size={20} />
        <Col>
          <Row justify="space-between" gutter={[10, 10]}>
            {tasteMenu.map((item) => (
              <CustomCol xs={24} sm={12} md={12} lg={6} xl={4} xxl={4}>
                <Row justify="center" align="middle">
                  <Card
                    style={{
                      backgroundColor:
                        item.id % 2 === 1 ? COLORS.blue.light + '33' : COLORS.blue.lightest + '1A',
                      height: '10rem',
                    }}
                  >
                    <Row justify="center">
                      <Image src={item.icon} />
                    </Row>
                    <Spacer style={{ display: 'inline-bloc', width: '100%' }}>
                      <Text
                        variant="headingMedium"
                        color="blue.darkest"
                        textAlign="center"
                        style={{ fontSize: '0.8rem', width: '100%' }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        variant="subtitle2"
                        color="blue.darker"
                        textAlign="center"
                        style={{ fontSize: '0.6rem', width: '100%' }}
                      >
                        {item.sub}
                      </Text>
                    </Spacer>
                  </Card>
                </Row>
              </CustomCol>
            ))}
          </Row>
        </Col>
        <Spacer style={{ height: 200 }} />
      </Card>
    </>
  )
}

export default PageHCDashboard

const Container = styled.div`
  background: ${COLORS.white};
  margin: -7px -20px;
  display: flex;
  flex-direction: row;
  padding: 16px;
`

const CustomCol = styled(Col)`
  &::after {
    content: '';
    width: 30%;
    height: 0;
  }
`
