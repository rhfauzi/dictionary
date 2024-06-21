import React from 'react'
import { Button } from 'pink-lava-ui'
import { ICAngleSmallLeft, ICAngleSmallRightWhite } from 'src/assets'
import { Card } from 'src/components'

interface PropsSectionButton{
  disabled?: boolean
  step?: number
  handleChange?: (name: string, step: number) => void
}

const SectionButton: React.FC<PropsSectionButton> = ({
  disabled = true,
  step = 1,
  handleChange,
  ...props
}) => (
  <Card style={{ borderRadius: 8, flex: 1, marginTop: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'right' }}>
      {step > 1 && (
      <Button
        size="big"
        variant="tertiary"
        className='hc-button-tertiary'
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
        disabled={disabled}
        size="big"
        variant="tertiary"
        className='hc-button'
        onClick={() => handleChange('next', step + 1)}
        style={{
          margin: '0px 10px',
          border: '2px solid #2771c7',
          color: 'white',
          background: '#2771c7',
        }}
      >
        {step === 13 ? 'Submit' : 'Next'} <ICAngleSmallRightWhite />
      </Button>
    </div>
  </Card>
)

export default SectionButton