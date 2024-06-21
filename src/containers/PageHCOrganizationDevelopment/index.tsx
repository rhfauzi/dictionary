import { Col, Row } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Card, Spacer, Text } from 'pink-lava-ui'
import { COLORS } from 'src/const/COLORS'
import styled from 'styled-components'
import { organizationDevelopmentMenu } from './Data/MenuData'

const PageHCOrganizationDevelopment = () => {
  const router = useRouter()
  let width = 0
  let height = 0

  if (typeof window !== 'undefined') {
    width = window !== undefined ? window.innerWidth : null
    height = window !== undefined ? window.innerHeight : null
  }

  const sliceNumberEnd = width <= 1200 ? 6 : 5

  return (
    <>
      <Container>
        <Text variant="headingLarge">Organization Development</Text>
      </Container>
      <Spacer size={50} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          // height: '100vh'
        }}
      >
        <div style={{ maxWidth: '70vw' }}>
          <Row
            style={{ padding: '0rem 2rem' }}
            align="middle"
            justify={width <= 1200 ? 'start' : 'space-between'}
          >
            {organizationDevelopmentMenu.slice(0, sliceNumberEnd).map((item) => (
              <Col
                xs={12}
                sm={8}
                md={8}
                xl={4}
                xxl={4}
                style={{
                  display: 'grid',
                  padding: '0.5rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div onClick={() => router.push(`/organization-development/${item.path}`)}>
                  <Card
                    key={item.id}
                    style={{
                      display: 'grid',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '9rem',
                      height: '12rem',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          background: item.bg,
                          borderRadius: '5rem',
                          width: '4.5rem',
                          height: '4.5rem',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <Image src={item.img} />
                      </div>
                    </div>
                    <Spacer size={10} />
                    <Spacer style={{ display: 'flex', justifyContent: 'center', height: '2.5rem' }}>
                      <Text
                        textAlign="center"
                        variant="headingSmall"
                        style={{ fontSize: '0.8rem' }}
                      >
                        {item.name}
                      </Text>
                    </Spacer>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
          <Spacer size={20} />
          <Row
            align="middle"
            style={{ padding: '0rem 2rem' }}
            justify={width <= 1200 ? 'start' : 'space-between'}
          >
            {organizationDevelopmentMenu.slice(sliceNumberEnd, 10).map((item) => (
              <Col
                xs={12}
                sm={8}
                md={8}
                xl={4}
                xxl={4}
                style={{
                  display: 'grid',
                  padding: '0.5rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {item.name && (
                  <div onClick={() => router.push(`/organization-development/${item.path}`)}>
                    <Card
                      key={item.id}
                      style={{
                        display: 'grid',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '9rem',
                        height: '12rem',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            background: item.bg,
                            borderRadius: '5rem',
                            width: '4.5rem',
                            height: '4.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                        >
                          {item.img && <Image src={item.img} />}
                        </div>
                      </div>
                      <Spacer size={10} />
                      <Spacer
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          height: '2.5rem',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          textAlign="center"
                          variant="headingSmall"
                          style={{ fontSize: '0.8rem' }}
                        >
                          {item.name}
                        </Text>
                      </Spacer>
                    </Card>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  )
}

export default PageHCOrganizationDevelopment

const Container = styled.div`
  background: ${COLORS.white};
  margin: -7px -20px;
  display: flex;
  flex-direction: row;
  padding: 16px;
`
