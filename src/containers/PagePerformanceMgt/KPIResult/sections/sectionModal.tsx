import React from 'react'
import { useKPIResultContext } from '../states'
import SectionCreateAndUpdate from './sectionCreateAndUpdate'
import SectionUpdateStatus from './sectionUpdateStatus'

export default function SectionModal() {
  const {
    state: { showModal, showModalStatus },
  } = useKPIResultContext()

  return (
    <React.Fragment>
      {showModal && <SectionCreateAndUpdate />}
      {showModalStatus && <SectionUpdateStatus />}
    </React.Fragment>
  )
}
