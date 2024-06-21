/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { SelectWithStars } from 'src/components'

interface Props {
  options?: object[]
  value?: string[]
  handleChangeValue?: (val: any) => void
}

const SelectStars = ({
  options = [{ id: 1, value: '', label: '' }],
  value,
  handleChangeValue,
}: Props) => {
  const [itemsOption, setItemsOption] = useState(options)

  return (
    <React.Fragment>
      <SelectWithStars
        label=''
        placeholder="Select"
        isSearch
        disabled={false}
        isLoading={false}
        options={itemsOption ?? []}
        value={value ?? []}
        callbackSearch={(val: string) => {
          setItemsOption(options.filter((item: any) => item.value.toLowerCase()?.includes(val)))
        }}
        callbackSelect={(data: any) => handleChangeValue(data)}
      />
    </React.Fragment>
  )
}

export default SelectStars