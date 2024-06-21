import React from 'react'
import { Loader } from 'src/components'
import { useDepartmentAndDivisionContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useDepartmentAndDivisionContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
