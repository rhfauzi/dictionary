/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react'
import { Card, Collapse } from 'antd'
import { Spacer, Text } from 'pink-lava-ui'
import styled from 'styled-components'
import { ICArrowAngleSmallDown } from 'src/assets'

const { Panel } = Collapse

const optionsBehaviourCompetency = [
  {
    id: 0,
    title: 'Core Competency',
    description: 'The fundamental skills, Knowledge, and abilitites that are essential for success in a particullar field, industry and role.',
  },
  {
    id: 1,
    title: 'Leadership Competency',
    description: 'Focuses on the skills and attributes necessary for effective leadership roles',
  },
  {
    id: 2,
    title: 'Role Competency',
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
        <Text variant='headingLarge'>Competency Analysis Step by Step</Text>

        <Spacer size={20} />
        {optionsBehaviourCompetency.map((item: any, index: number) => (
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

const ComponentStep1 = styled.div`
` as any