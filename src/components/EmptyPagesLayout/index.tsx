import { Row, Typography } from 'antd'
import Image from 'next/image'

const { Title, Text } = Typography;

interface EmptyStateProps {
  title: string,
  subtitle: string,
}
export const EmptyState: React.FC<EmptyStateProps> = (props: EmptyStateProps) => (
  <Row gutter={[8, 8]} justify="center" style={{ flexDirection: 'column' }}>
    <Image
      src='/hc/icons/empty-state.svg'
      width='200'
      height='100'
      alt="image-empty-state"
    />
    <Title level={5} style={{ margin: 0 }}>
      {props.title}
    </Title>
    <Text type="secondary">
      {props.subtitle}
    </Text>
  </Row>
)
