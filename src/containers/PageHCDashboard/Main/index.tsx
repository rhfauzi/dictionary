import React from 'react'
import { organizationDevelopmentMenu } from '../Data/MenuData'
import { Col, Row } from 'antd'
import { Button, Card, DropdownMenu, Input, Modal, Spacer, Text } from 'pink-lava-ui'

const Main = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        {organizationDevelopmentMenu.map((item) => (
          <Col span={4}>
            <Card>{item.name}</Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Main
