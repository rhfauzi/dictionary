import React from 'react'
import { Loader } from 'src/components'
import { useJobGradeContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useJobGradeContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
