import React from 'react'
import { Loader } from 'src/components'
import { useCountryContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useCountryContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
