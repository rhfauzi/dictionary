import React from 'react'

export default function Label(props) {
  const { text, required, style } = props

  return (
    <p
      style={{
        fontSize: '14px',
        fontWeight: '600',
        marginTop: '3px',
        marginBottom: 7,
        color: '#000000',
        ...style,
      }}
    >
      {text} {required && <span style={{ color: 'red' }}> &#42;</span>}
    </p>
  )
}