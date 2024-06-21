import React from 'react'
import { Loader } from 'src/components'
import { useJobCodeContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useJobCodeContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
