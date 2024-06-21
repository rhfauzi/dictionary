import React from 'react'
import { useKPIMonitoringContext } from '../states'
import SectionCreateAndUpdate from './sectionCreateAndUpdate'
import SectionUpdateStatus from './sectionUpdateStatus'

export default function SectionModal() {
  const {
    state: { showModal, showModalStatus },
  } = useKPIMonitoringContext()

  return (
    <React.Fragment>
      {showModal && <SectionCreateAndUpdate />}
      {showModalStatus && <SectionUpdateStatus />}
    </React.Fragment>
  )
}
