import React from 'react'
import { useMasterKPIProvider } from './states'

export default function MasterRiskClassProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const MasterKPI = useMasterKPIProvider()

  return (
    <MasterKPI.Provider
      value={{
        state: {
          ...MasterKPI.state,
        },
        handler: MasterKPI.handler,
      }}
    >
      {children}
    </MasterKPI.Provider>
  )
}
