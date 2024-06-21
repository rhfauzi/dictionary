import React from 'react'
import { useKPIResultProvider } from './states'

export default function MasterRiskClassProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const KPIResult = useKPIResultProvider()

  return (
    <KPIResult.Provider
      value={{
        state: {
          ...KPIResult.state,
        },
        handler: KPIResult.handler,
      }}
    >
      {children}
    </KPIResult.Provider>
  )
}
