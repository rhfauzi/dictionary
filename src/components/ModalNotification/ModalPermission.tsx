import React from 'react'
import Image from 'next/image'
import { Modal, Row, Col, Typography } from 'antd'
import { useErrorPermission, toggleErrorPermissionAction } from 'src/generalReducer'

const { Title, Text } = Typography

const ModalPermission: React.FC = () => {
  const errorPermission = useErrorPermission()
  const [modalErrorPermission, setModalErrorPermission] = React.useState(false)

  React.useEffect(() => {
    if (errorPermission) {
      setModalErrorPermission(true)
    }
  }, [errorPermission])

  return (
    <Modal
      open={modalErrorPermission}
      onOk={() => {
        setModalErrorPermission(false)
        toggleErrorPermissionAction(false)
      }}
      onCancel={() => {
        setModalErrorPermission(false)
        toggleErrorPermissionAction(false)
      }}
      footer={null}
      centered
      destroyOnClose
      maskClosable={false}
    >
      <Row justify="center" style={{ padding: '30px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Image
            src="/eds/icons/ic-dont-access.svg"
            loading="lazy"
            width={258}
            height={196}
            alt="Image don't have access"
          />
        </Col>
        <Col span={24}>
          <Title level={5} style={{ textAlign: 'center' }}>
            You don`t have access this feature!
          </Title>
          <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>
            Contact your super admin and ask for access permission.
          </Text>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalPermission
