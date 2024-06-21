import React from 'react'
import { useJobFamilyProvider } from './states'

export default function MasterRiskClassProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const JobFamily = useJobFamilyProvider()

  return (
    <JobFamily.Provider
      value={{
        state: {
          ...JobFamily.state,
        },
        handler: JobFamily.handler,
      }}
    >
      {children}
    </JobFamily.Provider>
  )
}
