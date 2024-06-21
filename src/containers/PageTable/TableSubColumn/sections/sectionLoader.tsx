import React from 'react'
import { Loader } from 'src/components'
import { useBusinessUnitContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useBusinessUnitContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
