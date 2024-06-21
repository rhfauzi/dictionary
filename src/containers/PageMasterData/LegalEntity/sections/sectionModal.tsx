import React from 'react'
import { useLegalEntityContext } from '../states'
import SectionCreateAndUpdate from './sectionCreateAndUpdate'
import SectionUpdateStatus from './sectionUpdateStatus'

export default function SectionModal() {
  const {
    state: { showModal, showModalStatus },
  } = useLegalEntityContext()

  return (
    <React.Fragment>
      {showModal && <SectionCreateAndUpdate />}
      {showModalStatus && <SectionUpdateStatus />}
    </React.Fragment>
  )
}
