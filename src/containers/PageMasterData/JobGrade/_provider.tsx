import React from 'react'
import { useJobGradeProvider } from './states'

export default function MasterRiskClassProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const JobGrade = useJobGradeProvider()

  return (
    <JobGrade.Provider
      value={{
        state: {
          ...JobGrade.state,
        },
        handler: JobGrade.handler,
      }}
    >
      {children}
    </JobGrade.Provider>
  )
}
