import React from 'react'
import { Loader } from 'src/components'
import { useJobFamilyContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useJobFamilyContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
