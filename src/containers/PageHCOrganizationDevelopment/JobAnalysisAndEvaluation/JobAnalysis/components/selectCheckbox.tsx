/* eslint-disable no-use-before-define */
import React, { useState } from 'react'
import { SelectWithCheckbox } from 'src/components'

interface Props {
  options?: object[]
  handleChangeValue?: (val: any) => void
  checkedList?: string[]
}

const SelectCheckbox = ({
  options = [],
  handleChangeValue,
  checkedList,
}: Props) => {
  const [itemsOption, setItemsOption] = useState(options)

  return (
    <React.Fragment>
      <SelectWithCheckbox
        label=''
        placeholder="Select"
        isSearch
        disabled={false}
        isLoading={false}
        isFinishedScroll={false}
        data={itemsOption ?? []}
        value={checkedList}
        callbackSearch={(val: string) => {
          setItemsOption(options.filter((item: any) => item.value.toLowerCase()?.includes(val)))
        }}
        callbackSelect={(data: any, isAll) => {
          handleChangeValue(data)
        }}
        // callbackScroll={(page: number) => console.log('page', page)}
      />
    </React.Fragment>
  )
}

export default SelectCheckbox