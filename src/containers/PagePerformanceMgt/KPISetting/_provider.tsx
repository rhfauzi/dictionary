import React from 'react'
import { useKPISettingProvider } from './states'

export default function MasterRiskClassProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const KPISetting = useKPISettingProvider()

  return (
    <KPISetting.Provider
      value={{
        state: {
          ...KPISetting.state,
        },
        handler: KPISetting.handler,
      }}
    >
      {children}
    </KPISetting.Provider>
  )
}
