/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react'
import { Card, Collapse } from 'antd'
import { Spacer, Text } from 'pink-lava-ui'
import styled from 'styled-components'
import { ICArrowAngleSmallDown } from 'src/assets'

const { Panel } = Collapse

const optionsTechnicalCompetency = [
  {
    id: 0,
    title: 'Method',
    description: 'The technical knowledge and skills required to understand, develop, optimize, and execute processes and procedures efficiently.',
  },
  {
    id: 1,
    title: 'Money',
    description: 'The ability to effectively manage financial resources within a technical project or process.',
  },
  {
    id: 2,
    title: 'Material',
    description: 'The understanding of the properties, characteristics, and limitations of the materials or resources used in a specific technical context.',
  },
  {
    id: 3,
    title: 'Machine',
    description: 'The proficiency in using and maintaining specific tools, equipment, hardware, or software systems relevant to a particular field or industry.',
  },
  {
    id: 4,
    title: 'Man',
    description: 'Specific skills, knowledge, and behaviors required to perform successfully in a particular job or role.',
  },
]

export default function Step1({ onChangeDisableButton }) {
  useEffect(() => {
    onChangeDisableButton(false)
  }, [])

  return (
    <ComponentStep1>
      <Card style={{ borderRadius: 8, flex: 1, minHeight: '203px' }}>
        <Text variant="headingLarge">Technical Analysis Step by Step</Text>

        <Spacer size={20} />
        {optionsTechnicalCompetency.map((item: any, index: number) => (
          <Collapse
            key={index}
            className='collapse-hc'
            expandIconPosition='end'
            expandIcon={() => (
              <div className='anticon anticon-right ant-collapse-arrow'>
                <ICArrowAngleSmallDown style={{ fill: '#000000' }} />
              </div>
            )}
            style={{ marginBottom: '20px' }}
          >
            <Panel
              key={index + 1}
              header={
                <div className="text-header" style={{ fontSize: '16px', fontWeight: 600, padding: '14px 16px' }}>
                  {item.title}
                </div>
              }
            >
              <Text style={{ fontSize: '16px', fontWeight: 400 }}>
                {item.description}
              </Text>
            </Panel>
          </Collapse>
        ))}
      </Card>
    </ComponentStep1>
  )
}

const ComponentStep1 = styled.div`` as any