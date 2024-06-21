import { Spacer, Text } from 'pink-lava-ui'
import React from 'react'
import { Space, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { COLORS } from 'src/const/COLORS'

interface DataType {
  key: string
  competency_name: string
  competency_description: string
  standard: string
  self_value: string
  self_gap: string
  n1_value: string
  n1_gap: string
  percentage: string
}

const Comopetency = ({ data }) => {
  const { ColumnGroup, Column } = Table

  return (
    <Spacer>
      <Spacer size={30} />
      <Table dataSource={data} pagination={false}>
        <Column
          title={() => (
            <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
              Competency Item
            </Text>
          )}
          dataIndex="competency_name"
          key="competency_name"
          render={(_, { competency_name, competency_description }) => (
            <>
              <Text style={{ fontWeight: 'bold' }}>{`${competency_name} `}</Text>
              {/* <Text variant="footer" style={{}}>{`${`     `} ${competency_description}`}</Text> */}
            </>
          )}
        />
        <ColumnGroup
          title={() => (
            <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
              Self Evaluation
            </Text>
          )}
        >
          <Column
            title={() => (
              <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
                Standard
              </Text>
            )}
            dataIndex="standard"
            key="standard"
            render={(_, { standard }) => (
              <Text style={{ fontWeight: 'bold' }}>{`${standard}`}</Text>
            )}
          />
          <Column
            title={() => (
              <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Value</Text>
            )}
            dataIndex="self_value"
            key="self_value"
          />
          <Column
            title={() => (
              <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Gap</Text>
            )}
            dataIndex="self_gap"
            key="self_gap"
          />
        </ColumnGroup>
        <ColumnGroup
          title={() => (
            <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
              N1 Evaluation
            </Text>
          )}
        >
          <Column
            title={() => (
              <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Value</Text>
            )}
            dataIndex="n1_value"
            key="n1_value"
          />
          <Column
            title={() => (
              <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Gap</Text>
            )}
            dataIndex="n1_gap"
            key="n1_gap"
          />
          <Column
            title={() => (
              <Text style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>%</Text>
            )}
            dataIndex="percentage"
            key="percentage"
          />
        </ColumnGroup>
      </Table>
    </Spacer>
  )
}

export default Comopetency
