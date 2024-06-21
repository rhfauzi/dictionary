import React from 'react'
import { useMasterKPIContext } from '../states'
import SectionCreateAndUpdate from './sectionCreateAndUpdate'
import SectionUpdateStatus from './sectionUpdateStatus'

export default function SectionModal() {
  const {
    state: { showModal, showModalStatus },
  } = useMasterKPIContext()

  return (
    <React.Fragment>
      {showModal && <SectionCreateAndUpdate />}
      {showModalStatus && <SectionUpdateStatus />}
    </React.Fragment>
  )
}
