import React from 'react'
import { Button } from 'pink-lava-ui'
import { ICAngleSmallLeft, ICAngleSmallRightWhite } from 'src/assets'

interface PropsSectionButton{
  step?: number
  handleChange?: (name: string, step: number) => void
}

const SectionButton: React.FC<PropsSectionButton> = ({
  step = 1,
  handleChange,
  ...props
}) => (
  <div style={{ display: 'flex', justifyContent: 'right' }}>
    {step > 1 && (
    <Button
      size="big"
      variant="tertiary"
      onClick={() => handleChange('prev', step - 1)}
      style={{
        margin: '0px 10px',
        border: '2px solid #2771c7',
        color: '#2771c7',
      }}
    >
      <ICAngleSmallLeft /> Previous
    </Button>
    )}

    <Button
      size="big"
      variant="tertiary"
      onClick={() => handleChange('next', step + 1)}
      style={{
        margin: '0px 10px',
        border: '2px solid #2771c7',
        color: 'white',
        background: '#2771c7',
      }}
    >
      Next <ICAngleSmallRightWhite />
    </Button>
  </div>
)

export default SectionButton