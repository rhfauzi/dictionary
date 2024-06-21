import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { Col, Dropdown, Input, MenuProps, Modal, Row, Switch } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Spacer, Text } from 'pink-lava-ui'
import { CSSProperties, FC, memo, useContext, useState } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { COLORS } from 'src/const/COLORS'
import { StructureOrgContext } from 'src/contexts/StructureOrgContext'
import styled from 'styled-components'

const containerStyle: CSSProperties = {
  backgroundColor: COLORS.white,
  position: 'relative',
}

const ChildLevel: FC<NodeProps> = ({ data }) => {
  const { isEditStructure } = useContext(StructureOrgContext)
  const [isModal, setModal] = useState<boolean>(false)
  const { image_url, employee_name, job_position, company_name, id, child, is_management_trainee } =
    data
  const router = useRouter()

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a href="#" onClick={() => setModal(true)}>
          <PlusCircleOutlined /> Add Employee
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          style={{
            color: !data.employee_name ? COLORS.grey.regular : COLORS.black.regular,
            cursor: !data.employee_name ? 'default' : 'pointer',
          }}
          onClick={() => {
            !data.employee_name
              ? null
              : router.push(`/organization-development/org-structure/detail/${data.id}`)
          }}
        >
          <InfoCircleOutlined /> Detail Employee
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a href="#" onClick={() => {}}>
          <EditOutlined /> Edit Employee
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a href="#" onClick={() => {}}>
          <DeleteOutlined /> Delete Employee
        </a>
      ),
    },
  ]

  return (
    <>
      {data.parent_id !== 0 && <Handle type="target" position={Position.Top} id="b" />}
      <div style={containerStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div
            style={{
              width: 50,
              height: 50,
              overflow: 'hidden',
              borderRadius: 100,
              marginRight: 10,
              alignSelf: 'center',
            }}
          >
            {image_url ? (
              <Image
                unoptimized
                loader={() => image_url}
                src={image_url}
                alt=""
                width={50}
                height={50}
              />
            ) : (
              <Image
                unoptimized
                src={'/hc/images/vacant-default.png'}
                alt=""
                width={50}
                height={50}
              />
            )}
          </div>
          <Col style={{ width: '75%' }}>
            <Text
              variant="headingRegular"
              style={{
                fontWeight: 'bold',
                fontSize: '0.7rem',
                color: !employee_name
                  ? COLORS.red.regular
                  : is_management_trainee
                  ? COLORS.green.darker
                  : COLORS.blue.regular,
              }}
            >
              {!employee_name ? 'Vacant' : truncateText(employee_name, 20)}
            </Text>
            <Text variant="subtitle1" color="black.dark" style={{ fontSize: '0.5rem' }}>
              {job_position}
            </Text>
            <Text variant="subtitle1" color="black.dark" style={{ fontSize: '0.5rem' }}>
              {company_name}
            </Text>
          </Col>
          {isEditStructure && (
            <Dropdown
              menu={{ items }}
              trigger={['click']}
              placement="bottomCenter"
              dropdownRender={(menu) => (
                <div style={{ background: 'red', position: 'absolute', top: 25, width: '10rem' }}>
                  {menu}
                </div>
              )}
            >
              <a onClick={(e) => e.preventDefault()} style={{ textDecoration: 'none' }}>
                <CustomMoreOutlined
                  style={{ position: 'absolute', right: 5, top: 5, transform: 'rotate(90deg)' }}
                />
              </a>
            </Dropdown>
          )}
        </div>
      </div>
      <Modal
        centered
        title={<Text style={{ fontSize: '1.5rem' }}>Add Employee</Text>}
        open={isModal}
        onCancel={() => setModal(false)}
        onOk={() => setModal(false)}
        footer={
          <Row justify="end">
            <Spacer
              onClick={() => setModal(false)}
              style={{
                cursor: 'pointer',
                background: COLORS.grey.lighter,
                padding: '0.3rem 1rem',
                borderRadius: '1rem',
              }}
            >
              <Text>Cancel</Text>
            </Spacer>
            <Spacer size={15} />
            <Spacer
              onClick={() => setModal(false)}
              style={{
                cursor: 'pointer',
                background: COLORS.blue.regular,
                padding: '0.3rem 1rem',
                borderRadius: '1rem',
              }}
            >
              <Text style={{ color: COLORS.white }}>Add</Text>
            </Spacer>
          </Row>
        }
      >
        <Row justify="end">
          <Text>Status</Text>
          <Spacer size={15} />
          <Switch />
          <Spacer size={15} />
          <Text>Status</Text>
        </Row>

        <Col xs={24} sm={12} md={8} lg={8} xl={24} xxl={24} style={{ marginBottom: '0.5rem' }}>
          <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
            Employee Name
          </Text>
          <CustomInput placeholder="Employee Name" />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={24} xxl={24} style={{ marginBottom: '0.5rem' }}>
          <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
            Employee Name
          </Text>
          <CustomInput placeholder="Employee Name" />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={24} xxl={24} style={{ marginBottom: '0.5rem' }}>
          <Text variant="label" style={{ fontSize: '0.7rem' }} color="black.darker">
            Employee Name
          </Text>
          <CustomInput placeholder="Employee Name" />
        </Col>
      </Modal>
      {child !== null && <Handle type="source" position={Position.Bottom} id="a" />}
    </>
  )
}

export default memo(ChildLevel)

const CustomMoreOutlined = styled(MoreOutlined)`
  svg {
    color: ${COLORS.blue.regular};
  }
`

const CustomInput = styled(Input)`
  border-radius: 8px;
  border: 1px solid #ccc;
`
