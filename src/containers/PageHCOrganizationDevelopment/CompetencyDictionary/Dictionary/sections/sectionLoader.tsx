import React from 'react'
import { Loader } from 'src/components'
import { useDictionaryContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useDictionaryContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
