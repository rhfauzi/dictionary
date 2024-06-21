import { Spacer, Text } from 'pink-lava-ui'
import React from 'react'
import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { COLORS } from 'src/const/COLORS'

interface DataType {
  kpi_name: string
  weight: string
  uom_name: string
  type: string
  category: string
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: () => (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Key Performance Indicator
      </Text>
    ),
    dataIndex: 'kpi_name',
    key: 'kpi_name',
    render: (_, { kpi_name }) => <Text>{`${kpi_name}`}</Text>,
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Weight
      </Text>
    ),
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        UoM
      </Text>
    ),
    dataIndex: 'uom_name',
    key: 'uom_name',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Type
      </Text>
    ),
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: (
      <Text variant="subtitle1" style={{ fontWeight: 'bold' }}>
        Category
      </Text>
    ),
    dataIndex: 'category',
    key: 'category',
  },
]

const KPI = ({ data }) => {
  const amountWeight = (dataKPI) => {
    let amount = 0
    if (dataKPI) {
      let resultWeightAmount = dataKPI?.map((item) => (amount += item?.weight))
      return `${resultWeightAmount[0]}%`
    }

    return `-`
  }

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
        summary={() => {
          return (
            <>
              <Table.Summary.Row style={{ background: COLORS.blue.regular + '33' }}>
                {/* @ts-ignore */}
                <Table.Summary.Cell>
                  <Text style={{ fontWeight: 'bold' }}>TOTAL</Text>
                </Table.Summary.Cell>
                {/* @ts-ignore */}
                <Table.Summary.Cell colSpan={4}>
                  <Text style={{ fontWeight: 'bold' }}>{amountWeight(data)}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          )
        }}
      />
    </Spacer>
  )
}

export default KPI
