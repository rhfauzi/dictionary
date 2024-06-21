import React from 'react'
import { useCountryContext } from '../states'
import SectionCreateAndUpdate from './sectionCreateAndUpdate'
import SectionUpdateStatus from './sectionUpdateStatus'

export default function SectionModal() {
  const {
    state: { showModal, showModalStatus },
  } = useCountryContext()

  return (
    <React.Fragment>
      {showModal && <SectionCreateAndUpdate />}
      {showModalStatus && <SectionUpdateStatus />}
    </React.Fragment>
  )
}
