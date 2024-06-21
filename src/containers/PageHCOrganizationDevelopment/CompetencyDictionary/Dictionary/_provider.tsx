import React from 'react'
import { useDictionaryProvider } from './states'

export default function MasterRiskClassProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const Dictionary = useDictionaryProvider()

  return (
    <Dictionary.Provider
      value={{
        state: { ...Dictionary.state },
        handler: Dictionary.handler,
      }}
    >
      {children}
    </Dictionary.Provider>
  )
}
