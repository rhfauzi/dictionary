/* eslint-disable no-use-before-define */
import React from 'react'
import { Spacer } from 'pink-lava-ui'
import { Col, Row } from 'antd'
import { Card } from 'src/components'
// import { useRouter } from 'next/router'
// import { SimpleAccessAction } from 'src/hooks/usePermission'
import styled from 'styled-components'
import MasterKPIProvider from './_provider'
import { SectionAction, SectionConfirm, SectionLoader, SectionTable } from './sections'
import SectionModal from './sections/sectionModal'

export default function PageMasterKPI() {
  // const router = useRouter()
  // React.useEffect(() => {
  //   SimpleAccessAction({
  //     key: 'View',
  //     status: (e: boolean) => {
  //       if (!e) router.push('/403')
  //     },
  //   })
  // }, [])

  return (
    <MasterKPIProvider>
      <MasterKPI>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <SectionAction />
          </Col>
          <Col span={24}>
            <Card>
              <Spacer size={10} />
              <SectionTable />
            </Card>
          </Col>
        </Row>

        <SectionConfirm />
        <SectionModal />
        <SectionLoader />
      </MasterKPI>
    </MasterKPIProvider>
  )
}

const MasterKPI = styled.div`
  .hc-button {
    background-color: #2771c7;
    border: 1px solid #2771c7;
  }
  .hc-button: hover {
    background-color: #164b89;
    border: 1px solid #164b89;
  }

  .hc-button-export {
    background-color: #d4e4fc;
    border: 1px solid #d4e4fc;
    color: #2771c7;
  }
  .hc-button-export: hover {
    background-color: #164b893b;
  }

  .hc-button-tertiary {
    background-color: #ffffff;
    border: 2px solid #2771c7;
    color: #2771c7;
  }
  .hc-button-tertiary: hover {
    border: 2px solid #114480;
    color: #114480;
  }
  .hc-button-tertiary: disabled {
    background-color: #dddddd;
    border: 2px solid #dddddd;
  }

  .ant-switch-checked {
    background: #2771c7 !important;
  }
  .ant-switch-checked .ant-switch-handle {
    left: calc(100% - 18px - 2px) !important;
  }
` as any
