/* eslint-disable operator-linebreak */
import React from 'react'
import { colors } from 'src/configs/colors'
import { useAppContext } from 'src/contexts'
import useTable from '../useTable'

type TableType = ReturnType<typeof useTable>
type FiltersType = TableType['state']['body']['filters']

interface SearchProps {
  placeholder?: string
  width?: string
  height?: string
  nameIcon?: string
  colorIcon?: string
  value?: string
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  allowClear?: boolean
}

export default function useFilters(
  /**
   * Return of Hooks Table
   */
  table: TableType,
  /**
   * Placeholder of Search Input
   */
  placeholder: string = 'Search ID',
  /**
   * Column Name of ID
   */
  ids: string[] = ['id'],
  /*
   * validasi untuk bypass search minimal 3 karakter di module EDS
   */
  bypassVal?: Boolean,
) {
  const {
    state: { body },
  } = table
  const app = useAppContext()
  const [filters, setFilters] = React.useState<FiltersType>([])
  const [oldfilters, setOldFilters] = React.useState<FiltersType>([])
  const [filterId, setFilterId] = React.useState('')
  const [currentIdsIndex, setCurrentIdsIndex] = React.useState(-1)
  const [fetchFilters, setFetchFilters] = React.useState(false)

  function getCurrentId() {
    return ids[currentIdsIndex]
  }
  function onChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setFilterId(value)

    if (bypassVal === true) {
      setFetchFilters(true)
      setCurrentIdsIndex(0)
    } else {
      if (value.length >= 3) {
        setFetchFilters(true)
        setCurrentIdsIndex(0)
      } else if (value === '') {
        setFetchFilters(true)
      } else {
        setFetchFilters(false)
      }
    }
  }
  const searchProps: SearchProps = {
    allowClear: true,
    colorIcon: colors.grey.regular,
    nameIcon: 'SearchOutlined',
    onChange: onChangeSearch,
    placeholder,
    value: filterId,
    width: '380px',
    height: '38px',
  }

  function handleDataChange() {
    if (filterId !== '') {
      if (table.state.data.length === 0) {
        if (currentIdsIndex < ids.length - 1) {
          setCurrentIdsIndex((prev) => prev + 1)
          setFetchFilters(true)
        } else {
          setCurrentIdsIndex(0)
          setFetchFilters(false)
        }
      }
    }
  }

  function handleRequestPrevious() {
    if (app.state.isRequestPrevious) {
      setFilters(body.filters)

      setOldFilters(body.filters)
      setFilterId(
        body.filters.find((f) => ids.includes(f.field))?.from_value.replaceAll('%', '') || '',
      )
    } else {
      table.handler.handleFilter(filters)
    }
  }

  function handleFetchFilters() {
    const removedFilterID = filters.filter((f) => !ids.includes(f.field))

    if (fetchFilters) {
      if (filterId === '') {
        setFilters(removedFilterID)
      } else {
        setFilters([
          ...removedFilterID,
          {
            field: getCurrentId(),
            option: 'CP',
            data_type: 'S',
            from_value: `%${filterId}%`,
          },
        ])
      }
    }

    setFetchFilters(false)
  }

  React.useEffect(handleDataChange, [table.state.data])
  React.useEffect(handleRequestPrevious, [app.state.isRequestPrevious, filters])
  React.useEffect(handleFetchFilters, [fetchFilters])

  return {
    filters,
    setFilters,
    oldfilters,
    setOldFilters,
    filterId,
    setFilterId,
    onChangeSearch,
    searchProps,
    setFetchFilters,
  }
}
