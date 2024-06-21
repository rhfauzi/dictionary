import React, { useState } from 'react'
import { Card, Divider, Menu, Row } from 'antd'
import type { MenuProps } from 'antd'
import { Spacer, Text } from 'pink-lava-ui'
import styled from 'styled-components'
import { COLORS } from 'src/const/COLORS'
import Overview from './SubMenuPages/Overview'
import EmergencyContact from './SubMenuPages/EmergencyContact'
import { ICArrowLeft } from 'src/assets'
import { useRouter } from 'next/router'
import JobDescription from './SubMenuPages/JobDescription'
import KPI from './SubMenuPages/KPI'
import PerformanceHistory from './SubMenuPages/PerformanceHistory'
import EmploymentHistory from './SubMenuPages/EmploymentHistory'
import Comopetency from './SubMenuPages/Competency'
import { OrganizationStructureAPI } from 'src/api/organization-structure'

const items: MenuProps['items'] = [
  {
    label: 'Overview',
    key: 'overview',
  },
  {
    label: 'Job Description',
    key: 'jobdesc',
  },
  {
    label: 'KPI',
    key: 'kpi',
  },
  {
    label: 'Competency',
    key: 'competency',
  },
  {
    label: 'Performance History',
    key: 'performance',
  },
  {
    label: 'Employment History',
    key: 'employment',
  },
  {
    label: 'Emergency Contact',
    key: 'emergency',
  },
]

const PageODOrganizationStructureDetail = ({ id_employee }) => {
  const [current, setCurrent] = useState<string>('overview')
  const router = useRouter()

  const { data: DataOrganizationStructureIDDetail } = OrganizationStructureAPI?.hooks?.GetDetail({
    id: id_employee,
    onSuccess(e) {},
  })

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }

  const renderSubMenuPage = () => {
    switch (current) {
      case 'overview':
        return <Overview data={DataOrganizationStructureIDDetail?.data?.employee} />
      case 'jobdesc':
        return <JobDescription data={DataOrganizationStructureIDDetail?.data?.job_description} />
      case 'kpi':
        return <KPI data={DataOrganizationStructureIDDetail?.data?.kpi} />
      case 'competency':
        return <Comopetency data={DataOrganizationStructureIDDetail?.data?.competency} />
      case 'performance':
        return (
          <PerformanceHistory data={DataOrganizationStructureIDDetail?.data?.performance_history} />
        )
      case 'employment':
        return (
          <EmploymentHistory data={DataOrganizationStructureIDDetail?.data?.employment_history} />
        )
      case 'emergency':
        return (
          <EmergencyContact data={DataOrganizationStructureIDDetail?.data?.emergency_contact} />
        )
      default:
        break
    }
  }

  return (
    <>
      <Container>
        <Row align="middle" justify="space-between">
          <Row align="middle">
            <ICArrowLeft onClick={() => router.back()} style={{ cursor: 'pointer' }} />
            <Text variant="headingLarge">Profile Detail</Text>
          </Row>
        </Row>
      </Container>
      <Card style={{ borderRadius: 20, flex: 1, marginTop: '2rem' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          style={{ justifyContent: 'space-between', display: 'flex', flex: 1 }}
        >
          {items?.map((item) => (
            <CustomMenuItem key={item.key} onClick={onClick}>
              {/* @ts-ignore */}
              {item.label}
            </CustomMenuItem>
          ))}
        </Menu>
        <Spacer size={10} />
        {renderSubMenuPage()}
      </Card>
    </>
  )
}

export default PageODOrganizationStructureDetail
const CustomMenuItem = styled(Menu.Item)`
  &:hover {
    color: ${COLORS.black.regular} !important;
  }
`
const Container = styled.div`
  background: ${COLORS.white};
  margin: -7px -20px;
  display: flex;
  flex-direction: row;
  padding: 16px;
`
