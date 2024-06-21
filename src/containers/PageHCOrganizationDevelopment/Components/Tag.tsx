import React from 'react'
import { Row } from 'antd'
import { Spacer, Text } from 'pink-lava-ui'

import { ICClose } from 'src/assets'
import { COLORS } from 'src/const/COLORS'

const Tag = ({ value, onClear }) => {
  return (
    <>
      <Spacer size={30} />
      <Spacer>
        <Row
          gutter={[20, 20]}
          align="middle"
          style={{
            borderWidth: 1,
            border: `0.05rem solid ${COLORS.blue.regular}`,
            borderRadius: '3rem',
            padding: '0.5rem 1rem',
          }}
        >
          <Text>{value}</Text>
          <Spacer size={5} />
          <ICClose style={{ cursor: 'pointer' }} onClick={onClear} />
        </Row>
      </Spacer>
    </>
  )
}

export default Tag
