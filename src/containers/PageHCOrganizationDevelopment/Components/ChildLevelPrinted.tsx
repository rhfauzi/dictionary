import { Col, Row } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Spacer, Text } from 'pink-lava-ui'
import { CSSProperties, FC, memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { COLORS } from 'src/const/COLORS'

const containerStyle: CSSProperties = {
  backgroundColor: COLORS.white,
}

const ChildLevelPrinted: FC<NodeProps> = ({ data }) => {
  const { image_url, employee_name, job_position, company_name, id, child, is_management_trainee } =
    data
  const router = useRouter()

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  return (
    <>
      {data.parent_id !== 0 && <Handle type="target" position={Position.Top} id="b" />}
      <div
        style={containerStyle}
        onClick={() => router.push(`/organization-development/org-structure/detail/${data.id}`)}
      >
        <Row align="middle" justify="center" style={{ display: 'flex', flexDirection: 'column' }}>
          <Spacer size={10} />
          <Text variant="subtitle1" color="black.dark" style={{ fontSize: '1rem' }}>
            {job_position}
          </Text>
          <Text
            variant="headingRegular"
            style={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: !employee_name
                ? COLORS.red.regular
                : is_management_trainee
                ? COLORS.green.darker
                : COLORS.blue.regular,
            }}
          >
            {!employee_name ? 'Vacant' : truncateText(employee_name, 20)}
          </Text>
        </Row>
      </div>

      {child !== null && <Handle type="source" position={Position.Bottom} id="a" />}
    </>
  )
}

export default memo(ChildLevelPrinted)
