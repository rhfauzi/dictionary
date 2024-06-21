import React from 'react'
import { useSubJobFamilyProvider } from './states'

export default function MasterRiskClassProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const SubJobFamily = useSubJobFamilyProvider()

  return (
    <SubJobFamily.Provider
      value={{
        state: {
          ...SubJobFamily.state,
        },
        handler: SubJobFamily.handler,
      }}
    >
      {children}
    </SubJobFamily.Provider>
  )
}
