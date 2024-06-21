import React from 'react'
import { useJobTitleProvider } from './states'

export default function MasterRiskClassProvider(props: React.PropsWithChildren<React.ReactNode>) {
  const { children } = props
  const JobTitle = useJobTitleProvider()

  return (
    <JobTitle.Provider
      value={{
        state: {
          ...JobTitle.state,
        },
        handler: JobTitle.handler,
      }}
    >
      {children}
    </JobTitle.Provider>
  )
}
