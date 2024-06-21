import React, { useEffect } from 'react'
import { Image, Card } from 'antd'
import Head from 'next/head'

export default function PageNotFound() {
  useEffect(() => {
    localStorage.removeItem('errorPage')
  })

  return (
    <React.Fragment>
      <Card style={{ borderRadius: '16px' }}>
        <Head>
          <title>404 - Page Not Found</title>
        </Head>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <div style={{ paddingBottom: '10px' }}>
            <Image src="/eds/images/404oops.png" preview={false} alt="" />
          </div>
          <p style={{ fontWeight: 'bold', fontSize: '16px' }}>404 - Page Not Found</p>
          <div>
            <p style={{ color: '#666666', justifyContent: 'center', textAlign: 'center' }}>
              The page you’re looking for doesn’t exist has its name changed
              <br /> or is temporarily unavailable.
            </p>
            <br />
          </div>
          <div>
            <Image src="/eds/images/404image.png" preview={false} alt="" />
          </div>
        </div>
        <br />
      </Card>
    </React.Fragment>
  )
}
