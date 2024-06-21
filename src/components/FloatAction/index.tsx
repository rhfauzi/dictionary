import React from 'react'
import { COLORS } from 'src/const/COLORS'

interface FloatActionProps {
  children?: React.ReactNode
}

export default function FloatAction(props: FloatActionProps) {
  const { children } = props

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10%',
        left: '50%',
        transform: 'translate(-40%, 0)',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        border: `2px solid ${COLORS.blue.regular}`,
        width: 800,
        zIndex: 700,
      }}
    >
      <div style={{ display: 'flex' }}>{children}</div>
    </div>
  )
}
