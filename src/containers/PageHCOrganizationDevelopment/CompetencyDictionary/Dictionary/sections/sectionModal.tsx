import React from 'react'
import { useDictionaryContext } from '../states'
import SectionUpdateStatus from './sectionUpdateStatus'

export default function SectionModal() {
  const {
    state: { showModalStatus },
  } = useDictionaryContext()

  return (
    <React.Fragment>
      {showModalStatus && <SectionUpdateStatus />}
    </React.Fragment>
  )
}
