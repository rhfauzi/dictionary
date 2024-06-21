/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { Text } from 'pink-lava-ui'
import { Col, Row, Divider, Table } from 'antd'
import { Card } from 'src/components'
import { ICHCShirt, ICHCPants, ICHCShoes } from 'src/assets'
import Image from 'next/image'
import DebounceSelect from 'src/components/DebounceSelect'
import styled from 'styled-components'
import Label from '../component/label'
import {
  columnsShirt,
  dataShirt,
  columnsPants,
  dataPants,
  columnsShoes,
  dataShoes,
} from './dataTable12'
import SectionButton from '../section/SectionButton'

export default function Step12({
  questionStep = 1,
  handleChange,
}) {
  const [question, setQuestion] = useState({
    shirt_size: null,
    pants_size: null,
    shoe_size: null,
  })

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('employee_self_service'))
    setQuestion({
      shirt_size: prevData?.shirt_size ?? null,
      pants_size: prevData?.pants_size ?? null,
      shoe_size: prevData?.shoe_size ?? null,
    })
  }, [])

  return (
    <>
      <Card style={{ borderRadius: 8, height: '627px', overflow: 'hidden scroll' }}>
        <Row gutter={[20, 20]}>
          <Col xs={24} xl={24}>
            <Text variant="headingRegular" style={{ fontWeight: 'bold', color: '#164882' }}>
              Uniform Size
            </Text>
            <Divider />
          </Col>

          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex' }}>
              <Col xs={5} xl={5}>
                <Label text={'Shirt Size'}/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required={false}
                  type="input"
                  placeholder="e.g M"
                  value={question.shirt_size ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, shirt_size: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Image src={ICHCShirt} alt=''/>
              </Col>
              <Col xs={19} xl={19}>
                <TableAnt
                  columns={columnsShirt}
                  dataSource={dataShirt}
                  pagination={false}
                  style={{ marginTop: '40px' }}
                />
              </Col>
            </Row>
            <Divider />
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Pants Size'}/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required={false}
                  type="input"
                  placeholder="e.g M"
                  value={question.pants_size ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, pants_size: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Image src={ICHCPants} alt=''/>
              </Col>
              <Col xs={19} xl={19}>
                <TableAnt
                  columns={columnsPants}
                  dataSource={dataPants}
                  pagination={false}
                  style={{ marginTop: '40px' }}
                />
              </Col>
            </Row>
            <Divider />
          </Col>
          <Col xs={24} xl={24}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Label text={'Shoes Size'}/>
              </Col>
              <Col xs={12} xl={12}>
                <DebounceSelect
                  label=""
                  required={false}
                  type="input"
                  placeholder="e.g 40"
                  value={question.shoe_size ?? undefined}
                  onChange={(e: any) => {
                    setQuestion({ ...question, shoe_size: e?.target?.value })
                  }}
                  style={{ width: '100%', height: '38px', fontSize: '14px', paddingTop: '4px' }}
                />
              </Col>
            </Row>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col xs={5} xl={5}>
                <Image src={ICHCShoes} alt=''/>
              </Col>
              <Col xs={19} xl={19}>
                <TableAnt
                  columns={columnsShoes}
                  dataSource={dataShoes}
                  pagination={false}
                  style={{ marginTop: '40px' }}
                />
              </Col>
            </Row>
            <Divider />
          </Col>
        </Row>
      </Card>

      <SectionButton
        disabled={false}
        step={questionStep}
        handleChange={(name: string, step: number) => {
          handleChange(name, step, question)
        }}
      />
    </>
  )
}

const TableAnt = styled(Table)`
.ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
  width: 0px !important;
}
.ant-table-thead > tr > th {
  font-weight: 600;
  color: #000000;
}

.ant-table-thead > tr > th,
.ant-table-tbody > tr > td,
.ant-table tfoot > tr > th,
.ant-table tfoot > tr > td {
  padding: 11px 10px !important;
}
` as any