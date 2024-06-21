import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, Spin } from 'pink-lava-ui'
import { debounce } from 'lodash'
import { Checkbox, Input, InputProps, Select, Row, Skeleton } from 'antd'
import { ICArrowDown } from 'src/assets'
import { DebounceSelectProps } from './types'
// import { NoData } from 'src/components/NoData'

const { TextArea } = Input;

function DebounceSelect<
  ValueType extends {
    key?: string
    label: React.ReactNode
    labelExpand?: React.ReactNode
    value: any
    loading?: boolean
  } = any,
>({
  fetchOptions,
  debounceTimeout = 800,
  style = {},
  labelStyle = {},
  labelExpand,
  label,
  required,
  type,
  options,
  loading,
  ...props
}: DebounceSelectProps<ValueType> & InputProps) {
  const [fetching, setFetching] = useState(false)
  const [optionsFromFetch, setOptions] = useState<ValueType[]>(options)
  const fetchRef = useRef(0)

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      if (fetchOptions) {
        fetchRef.current += 1
        const fetchId = fetchRef.current
        setOptions([])
        setFetching(true)

        fetchOptions(value)
          .then((newOptions) => {
            if (fetchId !== fetchRef.current) {
              // for fetch callback order
              return
            }
            setOptions(newOptions)
            setFetching(false)
          })
          .catch((_) => {
            setFetching(false)
          })
      }
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])

  useEffect(() => {
    setOptions(options)
  }, [options])

  const mainComponent = (
    <>
      {type === 'select' && (
        <>
          {!options ? (
            <Select
              allowClear={true}
              onFocus={() => debounceFetcher('')}
              showSearch
              aria-required={'true'}
              labelInValue
              suffixIcon={<ICArrowDown />}
              filterOption={false}
              onSearch={debounceFetcher}
              notFoundContent={
                fetching ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Spin size="small" />
                  </div>
                ) : null
              }
              placeholder="Type To Search"
              {...props}
              options={optionsFromFetch}
              size="large"
              style={{
                border: '1px solid #AAAAAA',
                borderRadius: 8,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                ...style,
              }}
            />
          ) : (
            <Select
              allowClear={true}
              aria-required={'true'}
              labelInValue
              options={options}
              {...props}
              size="large"
              style={{
                border: '1px solid #AAAAAA',
                borderRadius: 8,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                paddingTop: '8px',
                fontSize: '14px',
                ...style,
              }}
              suffixIcon={<ICArrowDown />}
            />
          )}
        </>
      )}
      {type === 'input' &&
        (loading ? (
          <Skeleton.Input active block size="large" />
        ) : (
          <Input
            size="large"
            {...(props as any)}
            style={{
              border: '1px solid #AAAAAA',
              borderRadius: 8,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              paddingTop: '8px',
              fontSize: '14px',
              ...style,
            }}
          />
        ))}
      {type === 'number' && (
        <Input
          size="large"
          type="number"
          {...(props as any)}
          style={{
            border: '1px solid #AAAAAA',
            borderRadius: 8,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            paddingTop: '8px',
            fontSize: '14px',
            ...style,
          }}
        />
      )}
      {type === 'checkbox' && (
        <Checkbox.Group
          {...(props as any)}
          options={options}
          style={{
            borderRadius: 8,
            height: 48,
            display: 'flex',
            ...style,
          }}
        />
      )}
      {type === 'email' && (
        <Input
          size="large"
          type="email"
          {...(props as any)}
          style={{
            border: '1px solid #AAAAAA',
            borderRadius: 8,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            paddingTop: '8px',
            fontSize: '14px',
            ...style,
          }}
        />
      )}
      {type === 'textarea' && (loading
        ? (<Skeleton.Input active block size="large" />)
        : (
          <TextArea
            size="large"
            {...(props as any)}
            style={{
              border: '1px solid #AAAAAA',
              borderRadius: 8,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              ...style,
            }}
          />
        ))}
    </>
  )

  if (label) {
    return (
      <div>
        <Text
          variant="headingSmall"
          textAlign="center"
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 8,
            width: labelExpand ? '100%' : 'fit-content',
            ...labelStyle,
          }}
        >
          <Row align="middle" justify="space-between">
            <div>
              {label}
              {required && <span style={{ color: 'red' }}> *</span>}
            </div>
            {labelExpand}
          </Row>
        </Text>
        {mainComponent}
      </div>
    )
  }

  return mainComponent
}

export default DebounceSelect
