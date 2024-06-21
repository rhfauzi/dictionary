import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, Spin } from 'pink-lava-ui'
import { debounce } from 'lodash'
import { ICArrowDown } from 'src/assets'
import { InputProps, Select, Row, Input } from 'antd'
import ICSearch from 'src/assets/icons/fi-rr-search.svg'
import { EmptyState } from 'src/containers/Layouts/EmptyPagesLayout/emptyState'
import { DebounceSelectProps } from './types'

function DebounceSelect3<
  ValueType extends {
    key?: string
    id?: string | number
    label: React.ReactNode
    labelExpand?: React.ReactNode
    value: string | number
    loading?: boolean
    disabled?: boolean
  } = any,
>({
  fetchOptions,
  debounceTimeout = 800,
  style = {},
  labelStyle = {},
  label,
  required,
  options,
  loading,
  disabled,
  ...props
}: DebounceSelectProps<ValueType> & InputProps) {
  const [fetching, setFetching] = useState(false)
  const [optionsFromFetch, setOptions] = useState<ValueType[]>(options)
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (values: string) => {
      if (fetchOptions) {
        fetchRef.current += 1
        const fetchId = fetchRef.current
        setOptions([])
        setFetching(true)

        fetchOptions(values).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            return
          }
          setOptions(newOptions)
          setFetching(false)
        })
      }
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  useEffect(() => {
    setOptions(options)
  }, [options])

  return (
    <React.Fragment>
      {label ? (
        <Text
          variant="headingSmall"
          textAlign="center"
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 8,
            width: '100%',
            ...labelStyle,
          }}
        >
          <Row align="middle" justify="space-between">
            <div>
              {label}
              {required && <span style={{ color: 'red' }}> *</span>}
            </div>
          </Row>
        </Text>
      ) : null}

      <Select
        allowClear={true}
        // onFocus={() => debounceFetcher('')}
        showSearch
        aria-required={'true'}
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        disabled={disabled}
        notFoundContent={
          fetching ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin size="small" />
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <EmptyState title="No Data" subtitle="" />
            </div>
          )
        }
        placeholder="Type To Search"
        options={optionsFromFetch}
        size="large"
        style={{
          border: '1px solid #AAAAAA',
          borderRadius: 8,
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '2px',
          fontSize: '14px',
          width: '100%',
          ...style,
        }}
        suffixIcon={<ICArrowDown />}
        dropdownRender={(menu) => (
          <React.Fragment>
            <Input
              placeholder="Search"
              style={{
                margin: '14px 14px 10px 14px',
                background: '#FFFFFF',
                border: '1px solid #888888',
                boxSizing: 'border-box',
                borderRadius: '8px',
                width: 'calc(100% - 28px)',
              }}
              allowClear={true}
              prefix={<ICSearch style={{ color: '#888888' }} />}
              onChange={(e) => debounceFetcher(e?.target?.value)}
            />
            {menu}
          </React.Fragment>
        )}
        {...props}
      />
    </React.Fragment>
  )
}

export default DebounceSelect3
