import { FC, memo } from 'react'
import { NodeProps, NodeResizer } from 'reactflow'

const CustomNode: FC<NodeProps> = ({ data, xPos, yPos }) => {
  return (
    <>
      <NodeResizer />
      <div>
        <div>
          Label: <strong>{data.label}</strong>
        </div>
        <div>
          Position: <strong>{`X: ${xPos.toFixed(2)}, Y: ${yPos.toFixed(2)}`}</strong>
        </div>
      </div>
    </>
  )
}

export default memo(CustomNode)
