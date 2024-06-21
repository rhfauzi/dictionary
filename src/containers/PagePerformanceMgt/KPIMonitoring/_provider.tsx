import React from 'react'
import { useKPIMonitoringProvider } from './states'

export default function MasterRiskClassProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const KPIMontiroing = useKPIMonitoringProvider()

  return (
    <KPIMontiroing.Provider
      value={{
        state: {
          ...KPIMontiroing.state,
        },
        handler: KPIMontiroing.handler,
      }}
    >
      {children}
    </KPIMontiroing.Provider>
  )
}
