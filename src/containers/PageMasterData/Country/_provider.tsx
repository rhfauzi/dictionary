import React from 'react'
import { useCountryProvider } from './states'

export default function MasterRiskClassProvider(
  props: React.PropsWithChildren<React.ReactNode>,
) {
  const { children } = props
  const Country = useCountryProvider()

  return (
    <Country.Provider
      value={{
        state: {
          ...Country.state,
        },
        handler: Country.handler,
      }}
    >
      {children}
    </Country.Provider>
  )
}
