import React from 'react'
import { BaseEdge, EdgeProps } from 'reactflow'

const CustomEdges = (props: EdgeProps) => {
  let edgePath = ''
  let willBeFixedPath = ''
  const { sourceX, sourceY, targetX, targetY, id, markerEnd, data } = props
  const { child } = data


  if (data?.child) {
    for (let i = 0; i < child?.length; i++) {
      const element = child[i]

      if (i === 0) {
        willBeFixedPath = `M ${sourceX} ${sourceY} L ${sourceX} ${targetY}`
      } else {
        willBeFixedPath = `M ${sourceX} ${sourceY} L ${sourceX} ${261} L ${
          sourceX - 130
        } ${261} L ${sourceX - 130} ${targetY - 20} L ${sourceX} ${
          targetY - 20
        } L ${sourceX} ${targetY}`
      }
    }
  }

  return <BaseEdge path={willBeFixedPath} />
}

export default CustomEdges
