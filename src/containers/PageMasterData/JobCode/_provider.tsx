import React from 'react'
import { useJobCodeProvider } from './states'

export default function MasterRiskClassProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const JobCode = useJobCodeProvider()

  return (
    <JobCode.Provider
      value={{
        state: {
          ...JobCode.state,
        },
        handler: JobCode.handler,
      }}
    >
      {children}
    </JobCode.Provider>
  )
}
