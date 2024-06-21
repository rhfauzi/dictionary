import React from 'react'
import { Loader } from 'src/components'
import { useKPIMonitoringContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useKPIMonitoringContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
