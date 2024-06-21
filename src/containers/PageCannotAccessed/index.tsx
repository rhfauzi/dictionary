import { Row } from 'antd'
import React from 'react'

export default function PageCannotAccessed() {
  return (
    <>
      <Row
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: 'calc(100vh - 70px)',
          flexDirection: 'column',
        }}
        justify="center"
      >
        <div style={{ margin: 'auto', width: '50%', padding: '10px', textAlign: 'center' }}>
          <img
            style={{
              objectFit: 'contain',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '35%',
            }}
            src={'/eds/images/not-accessed.png'}
          />
          <br />
          <p style={{ fontWeight: 'bold' }}>You don't have access this menu !</p>
          <p>Contact your superadmin and ask for access permission</p>
        </div>
      </Row>
    </>
  )
}
