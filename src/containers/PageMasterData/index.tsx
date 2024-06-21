import React from 'react'
import { Col, Row } from 'antd'
import Image from 'next/image'
import { Card, Text, Spacer } from 'pink-lava-ui'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { COLORS } from 'src/const/COLORS'
import { masterDataMenu } from './MenuData'

const PageMasterData = () => {
  const router = useRouter()

  return (
    <div style={{ height: '85vh' }}>
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        <Text variant="headingLarge">Master Data</Text>
        <div style={{ fontSize: '11px', color: '#888888' }}>
          View your structure and Job description.
        </div>
      </Container>

      <Spacer size={50} />
      <Row gutter={[20, 20]} align="middle">
        {masterDataMenu.map((item: any, index: number) => (
          <Col
            key={index}
            xs={12} sm={12} md={12} xl={4} xxl={4}
            style={{
              display: 'grid',
              padding: '0.5rem',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div onClick={() => router.push(`${router.pathname}${item.path}`)}>
              <Card
                style={{
                  display: 'grid',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '8rem',
                }}
              >
                <div
                  style={{
                    background: item.bg,
                    width: '100%',
                    height: 'auto',
                    maxWidth: '96px',
                    aspectRatio: '1 / 1',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                  onClick={() => router.push(`${router.pathname}${item.path}`)}
                >
                  {item.img && <div
                  style={{
                    margin: item?.position !== 'center' ? '20px 0px 0px 20px' : '0px',
                    bottom: '0px',
                    right: '0px',
                  }}>
                    <Image src={item.img} alt=''/>
                  </div>}
                </div>
                <Spacer size={10} />
                <Spacer style={{ display: 'flex', justifyContent: 'center', height: '2.5rem' }}>
                  <Text textAlign="center" variant="headingSmall" style={{ fontSize: '0.7rem' }}>
                    {item.name}
                  </Text>
                </Spacer>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default PageMasterData

const Container = styled.div`
  background: ${COLORS.white};
  margin: -7px -20px;
  display: flex;
  flex-direction: row;
  padding: 16px;
` as any
