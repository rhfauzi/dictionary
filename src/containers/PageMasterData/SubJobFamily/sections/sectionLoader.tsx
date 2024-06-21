import React from 'react'
import { Loader } from 'src/components'
import { useSubJobFamilyContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useSubJobFamilyContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
