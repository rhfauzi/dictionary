import React from 'react'
import { Loader } from 'src/components'
import { useJobTitleContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useJobTitleContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
