import React from 'react'
import { Loader } from 'src/components'
import { useKPIResultContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useKPIResultContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
