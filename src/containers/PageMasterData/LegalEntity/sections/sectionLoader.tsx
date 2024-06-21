import React from 'react'
import { Loader } from 'src/components'
import { useLegalEntityContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useLegalEntityContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
