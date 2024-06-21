import React, { useState, useRef, useEffect } from 'react'
import { Button, Row, Modal } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import { generateFilterBody } from 'src/utils/misc'
import moment from 'moment'
import Field from './Field'

export interface FilterValueObj {
  field: string
  option?: string
  arrayValues?: string[]
  fromValue?: string | []
  toValue?: string | []
  dataType?: string
}

export const IconContext = React.createContext({
  resetIcon: false,
  //toggleReset: () => {}
})

function SmartFilter(props: {
  onOk
  children
  oldFilter?
  setDate1?
  setDate2?
  setDate3?
  setDate4?
  date3?
  date4?
  yearValue1?
  yearValue2?
  setYearValue1?
  setYearValue2?
  onClear?
}) {
  const {
    onOk,
    children,
    oldFilter,
    setDate1,
    setDate2,
    setDate3,
    setDate4,
    date3,
    date4,
    yearValue1,
    yearValue2,
    setYearValue1,
    setYearValue2,
    onClear,
  } = props
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [filterValues, setFilterValues] = useState<FilterValueObj[]>([])
  const prevValues = useRef<FilterValueObj[]>(filterValues)
  const prevOptionRef = useRef<string | null>(null)
  const [resetFlag, setResetFlag] = useState(false)
  const [notifInc, setNotifInc] = useState([])

  const handleChange = (changedFiledObj: FilterValueObj) => {
    const currentValues = [...filterValues]
    // check is already in the box
    const isExist = currentValues.find((f) => f.field === changedFiledObj.field)
    // if not exist, push
    if (!isExist) return setFilterValues([...currentValues, changedFiledObj])
    // if exist, update
    const updatedValues = currentValues.map((f) => {
      if (f.field === changedFiledObj.field) return { ...f, ...changedFiledObj }

      return { ...f }
    })

    return setFilterValues(updatedValues)
  }

  const handleApply = () => {
    prevValues.current = filterValues
    let newFilterValues = []
    prevValues.current.map((v) => {
      if (v.fromValue !== undefined && v.fromValue !== null) {
        newFilterValues.push(v)
      }
    })

    if (yearValue1 != null && date3 === null) {
      const options = filterValues?.length === 1 ? filterValues[0]?.option : filterValues[1]?.option
      const newItem = {
        field: 'year_period',
        dataType: 'S',
        fromValue: moment(yearValue1),
        option: options,
        toValue: yearValue2 != null ? moment(yearValue2) : null,
      }
      newFilterValues.push(newItem)
      notifInc.push(newFilterValues)
    }
    onOk(generateFilterBody(newFilterValues))
    setShowFilter(false)
  }

  const clearAllValue = () => {
    setFilterValues([])
    setDate1?.(null)
    setDate2?.(null)
    setDate3?.(null)
    setDate4?.(null)
    setYearValue1?.(null)
    setYearValue2?.(null)
    setResetFlag((prev) => !prev)
    if (typeof onClear !== 'undefined') {
      onClear()
    }
  }

  const closeAndSetToPrevValues = () => {
    setShowFilter(false)
    setFilterValues(filterValues)
    setResetFlag(false)
  }

  const getBaseValue = (item: any, type: 'to' | 'from') => ({
    label: item[`${type}_value_label`],
    value: item[`${type}_value`],
    key: item[`${type}_value`],
  })

  useEffect(() => {
    if (oldFilter) {
      const FilterOld = oldFilter.map((item: any) => ({
        field: item.field,
        dataType: item.dataType,
        fromValue: item.field.includes('date')
          ? moment(item.from_value)
          : getBaseValue(item, 'from'),
        toValue: item.field.includes('date') ? moment(item.to_value) : getBaseValue(item, 'to'),
        option: item.option,
      }))
      setFilterValues(FilterOld)
    }
  }, [oldFilter])

  useEffect(() => {
    const newOption = filterValues.length > 0 ? filterValues[0].option : null
    if (prevOptionRef.current !== newOption && prevOptionRef.current !== null) {
      setFilterValues((prevState) =>
        prevState.map((item) => ({
          ...item,
          fromValue: undefined,
          toValue: undefined,
        })),
      )
    }
    prevOptionRef.current = newOption

    let newNotifInc = filterValues.filter((x) =>
      x.fromValue === null ? false : x.fromValue !== undefined && !x.option.includes('CP'),
    )
    setNotifInc(newNotifInc)
  }, [filterValues])

  const content = (
    <div style={{ paddingBottom: 20 }}>
      <IconContext.Provider value={{ resetIcon: resetFlag }}>
        {React.Children.map(children, (child) => (
          <>
            {React.cloneElement(child, {
              ...child.props,
              key: child.field,
              value: filterValues.find((f) => f.field === child.props.field),
              handleChange,
            })}
          </>
        ))}
      </IconContext.Provider>
      <Row gap="16px" reverse>
        <Button onClick={handleApply}>Apply</Button>
        <Button variant="tertiary" onClick={clearAllValue}>
          Clear All
        </Button>
      </Row>
    </div>
  )

  return (
    <>
      <Button
        size="big"
        variant="tertiary"
        onClick={() => setShowFilter(true)}
        style={{
          // ...{ borderColor: '#888888', color: '#888888' },
          color: '#888888',

          border: '1px solid #888888',
          backgroundColor: 'white',
          justifyContent: 'flex-start',
          gap: 16,
        }}
      >
        {/* <ICFilter /> Filter */}
        {notifInc.length > 0 ? (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#EB008B',
              // backgroundColor: '#88888888',
              color: 'white',
              borderRadius: '50%',
              marginLeft: 5,
              width: 25,
              height: 25,
            }}
          >
            {notifInc.length}
          </span>
        ) : (
          <ICFilter />
        )}
        {notifInc.length > 0 ? 'Filter Used' : 'Filter'}
      </Button>
      <Modal
        destroyOnClose
        visible={showFilter}
        title="Filter"
        onCancel={closeAndSetToPrevValues}
        width={880}
        footer={false}
        content={content}
        maskClosable={false}
      />
    </>
  )
}

SmartFilter.Field = Field
export default SmartFilter
