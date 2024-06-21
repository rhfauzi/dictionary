import React from 'react'
import { Loader } from 'src/components'
import { useKPISettingContext } from '../states'

export default function SectionLoader() {
  const {
    state: { processing },
  } = useKPISettingContext()
  return <>{processing && <Loader type="process" text={processing} />}</>
}
