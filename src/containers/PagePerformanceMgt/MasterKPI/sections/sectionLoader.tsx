import React from 'react'
import { Loader } from 'src/components'
import { useMasterKPIContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useMasterKPIContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
