import { Spacer, Text } from 'pink-lava-ui'
import React from 'react'
import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { COLORS } from 'src/const/COLORS'

interface DataType {
  performance_name: string
  rating: string
  definition: string
  percentage: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: () => (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Performance Years
      </Text>
    ),
    dataIndex: 'performance_name',
    key: 'performance_name',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Rating
      </Text>
    ),
    dataIndex: 'rating',
    key: 'rating',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Definition
      </Text>
    ),
    dataIndex: 'definition',
    key: 'definition',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Percentage
      </Text>
    ),
    key: 'percentage',
    dataIndex: 'percentage',
  },
]

const PerformanceHistory = ({ data }) => {
  return (
    <Spacer>
      <Spacer size={30} />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{
          border: `1px solid ${COLORS.grey.lighter}`,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      />
    </Spacer>
  )
}

export default PerformanceHistory
