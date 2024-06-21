/* eslint-disable no-use-before-define */
import React from 'react'
import { Card } from 'antd'
import { Text } from 'pink-lava-ui'
import styled from 'styled-components'

const SectionSidebarList = ({
  dataQuestions = [],
  questionStep = 1,
  handleChange,
}) => (
  <Card style={{ borderRadius: 8, flex: 1, minHeight: '180px' }}>
    <Text variant="headingLarge" style={{ fontWeight: '400', color: '#444444' }}>
      Step {questionStep} of {dataQuestions?.length}
    </Text>
    {dataQuestions.map((item: any, index: number) => (
      <div
        key={index}
        style={{
          fontWeight: '600',
          color: (index + 1) === questionStep ? '#2771C7' : '#9DB5D9',
          fontSize: '14px',
          margin: '8px 0px',
          display: 'flex',
          cursor: 'pointer',
        }}
        onClick={() => handleChange(index + 1)}
      >
        <Circle color={(index + 1) === questionStep ? '#2771C7' : '#9DB5D9'} />
        Step {index + 1} : {item?.title} {!item?.require && '(Optional)'}
      </div>
    ))}
  </Card>
)

export default SectionSidebarList

const Circle = styled.div`
  width: 12px;
  height: 12px;
  // background: #2771C7;
  margin: 4px 9px 0px 0px;
  border-radius: 56%;
  background: ${(p) => (p?.color ? p?.color : '#2771C7')};
` as any