import React from 'react'
import { useDepartmentAndDivisionProvider } from './states'

export default function MasterRiskClassProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const DepartmentAndDivision = useDepartmentAndDivisionProvider()

  return (
    <DepartmentAndDivision.Provider
      value={{
        state: {
          ...DepartmentAndDivision.state,
        },
        handler: DepartmentAndDivision.handler,
      }}
    >
      {children}
    </DepartmentAndDivision.Provider>
  )
}
