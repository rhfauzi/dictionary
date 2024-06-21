/* eslint-disable no-use-before-define */
import React from 'react'
import styled from 'styled-components'
import { Col, Row, Modal, Typography } from 'antd'
import { ICClose, ICArrowLeft, ICAngleSmallRight } from 'src/assets/icons'

export default function ModalCompetencyAnalysis({
  page = 0,
  onChange,
  onCancel,
  showModal = false,
  data = {
    title: '',
    subTitle: '',
    option: [],
  },
}) {
  return (
    <ModalAntd
      zIndex={500}
      closable={false}
      open={showModal}
      footer={false}
    >
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Header>
            <ICClose
              style={{ marginTop: '8px', cursor: 'pointer' }}
              onClick={() => onCancel(false)}
            />
            {page > 0 && <ICArrowLeft
              style={{ cursor: 'pointer' }}
              onClick={() => onChange({ action: { status: 'prev', url: 0 } })}
            />}
          </Header>
        </Col>

        <Col span={24}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {data?.title ?? ''}
          </Typography.Title>
          <Typography.Title level={5} style={{ fontWeight: '400', fontSize: '14px', color: '#666666', marginTop: '10px' }}>
            {data?.subTitle ?? ''}
          </Typography.Title>
        </Col>

        {data?.option?.length > 0 && <Col span={24}>
          {data?.option?.map((item: any, index: number) => (
            <CardList key={index} onClick={() => onChange(item)}>
              {item.name} <ICAngleSmallRight />
            </CardList>
          ))}
        </Col>}
      </Row>
    </ModalAntd>
  )
}

const ModalAntd = styled(Modal)`
.hc-button { background-color: #2771C7; border: 1px solid #2771C7 }
.hc-button: hover { background-color: #164b89; border: 1px solid #164b89 }
.hc-button: disabled { background-color: #DDDDDD; border: 1px solid #DDDDDD }
.hc-button-tertiary { background-color: #FFFFFF; border: 2px solid #2771C7; color: #2771C7 }
.hc-button-tertiary: hover { border: 2px solid #114480; color: #114480 }
.hc-button-tertiary: disabled { background-color: #DDDDDD; border: 2px solid #DDDDDD }
` as any

const Header = styled.div`
padding: 0px;
display: flex;
justify-content: space-between;
align-items: flex-start;
flex-direction: row-reverse;
margin-left: -5px;
` as any

const CardList = styled.div`
font-size: 14px;
font-weight: 600;
color: #444444;
border: 1px solid #DDDDDD;
border-radius: 8px;
padding: 16px;
display: flex;
justify-content: space-between;
cursor: pointer;
margin-bottom: 20px;
` as any