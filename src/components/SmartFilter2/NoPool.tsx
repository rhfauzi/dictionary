import React, { useState, useRef, useEffect } from 'react'
import { Button, Row, Modal } from 'pink-lava-ui'
import { ICFilter } from 'src/assets'
import { generateFilterBody } from 'src/utils/misc'
import moment from 'moment'
import Fields from './Fields'

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

function SmartFilters(props: {
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
}) {
  const { onOk, children, oldFilter, setDate1, setDate2, setDate3, setDate4, 
    date3, date4, yearValue1, yearValue2, setYearValue1, setYearValue2 } = props
  const [showFilter, setShowFilter] = useState<boolean>(true)
  const [filterValues, setFilterValues] = useState<FilterValueObj[]>([])
  const prevValues = useRef<FilterValueObj[]>(filterValues)
  const prevOptionRef = useRef<string | null>(null)
  const [resetFlag, setResetFlag] = useState(false)
  const [notifInc, setNotifInc] = useState([]);

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
      if (v.fromValue !== undefined) {
        newFilterValues.push(v)
      }
    })
    if (yearValue1 != null && date3 === null) {
      const options = filterValues[1]?.option;
      const newItem = {
        field: "year_period",
        dataType: "S",
        fromValue: moment(yearValue1),
        option: options,
        toValue: yearValue2 != null ? moment(yearValue2) : null,     
      };
      newFilterValues.push(newItem);
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

    let newNotifInc = filterValues.filter(x => x.fromValue !== undefined);
    setNotifInc(newNotifInc);
  }, [filterValues])

  const content = (
    <div style={{ paddingBottom: 20, display:'flex' }}>
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
        </div>
    
    
  )

  return (
    <>
{content}
    </>
  )
}

SmartFilters.Fields = Fields
export default SmartFilters
