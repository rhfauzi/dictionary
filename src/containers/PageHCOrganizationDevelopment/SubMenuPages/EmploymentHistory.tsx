import { Spacer, Text } from 'pink-lava-ui'
import React from 'react'
import { Col, Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { COLORS } from 'src/const/COLORS'

interface DataType {
  position: string
  company_name: string
  from: string
  to: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: () => (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Position
      </Text>
    ),
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Company Name
      </Text>
    ),
    dataIndex: 'history_company_name',
    key: 'history_company_name',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        From
      </Text>
    ),
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        To
      </Text>
    ),
    key: 'to',
    dataIndex: 'to',
  },
]

const EmploymentHistory = ({ data }) => {
  return (
    <Spacer>
      <Spacer size={30} />
      <Col>
        <Text variant="headingRegular">{data?.internal ? 'Internal' : '-'}</Text>
        <Spacer size={10} />
        <Table
          columns={columns}
          dataSource={data?.internal}
          pagination={false}
          style={{
            border: `1px solid ${COLORS.grey.lighter}`,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        />
      </Col>
      <Spacer size={40} />
      <Col>
        <Text variant="headingRegular">{data?.external ? 'External' : '-'}</Text>
        <Spacer size={10} />
        <Table
          columns={columns}
          dataSource={data?.external}
          pagination={false}
          style={{
            border: `1px solid ${COLORS.grey.lighter}`,
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        />
      </Col>
    </Spacer>
  )
}

export default EmploymentHistory
