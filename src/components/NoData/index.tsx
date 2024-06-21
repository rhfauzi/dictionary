/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import { Row, Typography } from 'antd'
import { useRouter } from 'next/router'

const { Title, Text } = Typography

interface NoDataProps {
  title?: string
  subtitle?: string
}
export const NoData: React.FC<NoDataProps> = (props: NoDataProps) => {
  const router = useRouter()
  const toCamelCase = (str) => str.replaceAll('-', ' ').replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
  const extractUrl = router.pathname.split('/')
  const count = extractUrl.length
  let defaultTitle = count >= 3 ? toCamelCase(extractUrl[2]) : ''
  if (count >= 4) {
    defaultTitle = toCamelCase([extractUrl[3], defaultTitle].join(' '))
  }
  const defaultSubtitle = 'data is not available at this time'

  return (
    <Row
      gutter={[8, 8]}
      justify="center"
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        alt={''}
        style={{
          width: '200px',
          height: 'auto',
        }}
        src={'/hc/images/empty-state.png'}
      />
      {/* <div style={{ width: '165px', height: '100px' }}>
        <ICEmptyState />
      </div> */}
      <Title level={5} style={{ margin: 0, textAlign: 'center' }}>
        {props.title || `No Data ${defaultTitle}`}
      </Title>
      <Text type="secondary" style={{ textAlign: 'center' }}>{props.subtitle || defaultSubtitle}</Text>
    </Row>
  )
}
