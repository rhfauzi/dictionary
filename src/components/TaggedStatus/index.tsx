import { Tag } from 'antd'
import { Text } from 'pink-lava-ui'
import tagColors from './tagColors'

export interface TaggedStatusProps {
  status: string
  size?: string
  callPlanSource?: string
  BillingSchedule?: string
  style?: any
}

export default function TaggedStatus(props: TaggedStatusProps) {
  let { status, size, style = {} } = props
  let color: string
  let backgroundColor: string

  if (status?.includes('Wait For Approval')) {
    status = 'Waiting For Approval'
  }

  switch (true) {
    case tagColors.green.includes(status):
      color = '#1DB374'
      backgroundColor = '#E2FFF3'
      break
    case tagColors.red.includes(status):
      color = '#F14248'
      backgroundColor = '#FFE4E5'
      break
    case tagColors.blue.includes(status):
      color = '#4BA3A9'
      backgroundColor = '#D5FAFD'
      break
    case tagColors.orange.includes(status):
      color = 'orange'
      break
    case tagColors.yellow.includes(status):
      color = '#FFB400'
      backgroundColor = '#FFFBDF'
      break
    case tagColors.purple.includes(status):
      color = '#BC006F'
      backgroundColor = '#FDE6F3'
      break
    default:
      color = '#666666'
      backgroundColor = '#F4F4F4'
      break
  }

  return (
    <Tag
      {...(status === '' && { display: 'none' })}
      style={{
        borderColor: backgroundColor,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'inherit',
        backgroundColor,
        color,
        fontWeight: 'bold',
        ...style,
      }}
    >
      {size ? (
        <Text variant={props.size} {...{ color }}>
          {status}
        </Text>
      ) : (
        <>{status}</>
      )}
    </Tag>
  )
}
