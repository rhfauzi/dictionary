import { Empty, Row, Image, Card } from 'antd'
import Head from 'next/head'
import Router from 'next/router'
import { Button } from 'pink-lava-ui'
import React from 'react'

export default function PageNotFound() {
  React.useEffect(()=>{localStorage.removeItem("errorPage")})

  return (
    <>
      <Card style={{ borderRadius: '16px' }}>
        <Head>
          <title>403 - Page Don't Have Permissions</title>
        </Head>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '75vh',
          }}
        >
          <div style={{ paddingBottom: '10px' }}>
            <Image src="/eds/images/404oops.png" preview={false} />
          </div>
          <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Access Denied</p>
          <div>
            <p style={{ color: '#666666', justifyContent: 'center', textAlign: 'center' }}>
              You don’t have permission to view this page or resource
            </p>
            <br />
          </div>
          <div>
            <Image src="/eds/images/ic-image-privacy.svg" preview={false} />
          </div>
        </div>
        <br />
      </Card>
    </>
  )
}
