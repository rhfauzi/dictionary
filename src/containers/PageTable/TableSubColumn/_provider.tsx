import React from 'react'
import { useBusinessUnitProvider } from './states'

export default function MasterRiskClassProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const BusinessUnit = useBusinessUnitProvider()

  return (
    <BusinessUnit.Provider
      value={{
        state: {
          ...BusinessUnit.state,
        },
        handler: BusinessUnit.handler,
      }}
    >
      {children}
    </BusinessUnit.Provider>
  )
}
