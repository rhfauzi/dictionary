import React from 'react'

const CardComponent = (props: any) => {
  const { children, style } = props
  return (
    <div
      style={{
        ...style,
        width: '100%',
        background: '#ffffff',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0px 4px 16px 0px rgba(170, 170, 170, 0.15)',
      }}
    >
      {children}
    </div>
  )
}

export default CardComponent