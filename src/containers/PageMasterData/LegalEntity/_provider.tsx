import React from 'react'
import { useLegalEntityProvider } from './states'

export default function MasterRiskClassProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const LegalEntity = useLegalEntityProvider()

  return (
    <LegalEntity.Provider
      value={{
        state: {
          ...LegalEntity.state,
        },
        handler: LegalEntity.handler,
      }}
    >
      {children}
    </LegalEntity.Provider>
  )
}
