/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect, useState } from 'react'
import { Text } from 'pink-lava-ui'
import { Checkbox, Dropdown, Input, Menu, Row, Spin, Button } from 'antd'
import styled from 'styled-components'
import { ICArrowDown } from 'src/assets'
import { If, Then } from 'react-if'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { NoData } from 'src/components'
// import useScrollHandler from '../Hooks/UseHandleScroll'

interface SelectCheckboxProps {
    label?: string
    data?: any[]
    disabled?: boolean
    isLoading?: boolean
    isSearch?: boolean
    placeholder?: string
    callbackSearch?: (e: string) => void
    isFinishedScroll?: boolean
    callbackScroll?: (page: number) => void
    callbackSelect?: (data: any[], isAll: boolean) => void
    value?: any[]
    isAll?: boolean
}

const SelectCheckbox = (props: SelectCheckboxProps) => {
  const {
    label,
    data = [],
    disabled,
    isLoading,
    isSearch,
    placeholder,
    callbackSearch,
    // isFinishedScroll,
    // callbackScroll,
    callbackSelect,
    value,
  } = props
  const [visible, setVisible] = useState<boolean>(false)
  const [checkedItems, setCheckedItems] = useState(value)
  const [checkAll, setCheckAll] = useState<boolean>(false)
  const [indeterminate, setIndeterminate] = useState<boolean>(false)

  // const { handleScrollEvent } = useScrollHandler({
  //     isFinished: isFinishedScroll,
  //     callbackHandleScrollEvent(page: number) {
  //         message.info("load")
  //         callbackScroll(page)
  //     },
  // })

  const onChange = (checkedValues: any) => {
    setCheckedItems(checkedValues)
    setIndeterminate(!!checkedValues.length && checkedValues.length < data.length)
    setCheckAll(checkedValues.length === data.length)

    callbackSelect(checkedValues, checkAll)
  }

  const onCheckAllChange = (e: any) => {
    const dataAll = e?.target?.checked ? data?.map((item) => item?.value) : []
    setCheckedItems(dataAll);
    setIndeterminate(false)
    setCheckAll(e?.target?.checked)

    callbackSelect(dataAll, checkAll)
  }

  useEffect(() => {
    const isSelectAll = checkedItems?.length === data?.length
    setCheckAll(isSelectAll)
    if (value.length <= 0) {
      setIndeterminate(false)
    } else {
      setIndeterminate(!isSelectAll)
    }
  }, [])

  const Content = (
    <MenuStyled>
      <Menu.ItemGroup>
        <If condition={isSearch}>
          <Then>
            <Input
              disabled={disabled}
              placeholder={'Search'}
              allowClear={true}
              style={{
                background: '#FFFFFF',
                border: '1px solid #888888',
                borderRadius: '8px',
              }}
              prefix={<SearchOutlined />}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={(e) => callbackSearch(e?.target?.value)}
            />
          </Then>
        </If>

        <div
          // onScroll={handleScrollEvent}
          style={{ maxHeight: 150, overflowY: 'auto' }}>
          <If condition={isLoading}>
            <Then>
              <div style={{ position: 'absolute', bottom: 10, left: '50%' }}>
                <Spin indicator={<LoadingOutlined />} />
              </div>
            </Then>
          </If>

          {data?.length > 0 ? (
            <div style={{ marginTop: 6 }}>
              <Checkbox
                checked={checkAll}
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
              >
                Select All
              </Checkbox>

              <Checkbox.Group
                style={{ width: '100%' }}
                onChange={onChange}
                value={checkedItems}
              >
                {data?.map((item: any, index: number) => (
                  <Checkbox
                    key={index}
                    name={item.value}
                    value={item.value}
                    checked={true}
                  >
                    {item.label}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          ) : (
            <NoData
              subtitle="The data is not available at this time"
              title={`No Data ${label}`}
            />
          )}
        </div>
      </Menu.ItemGroup>
    </MenuStyled>
  )

  return (
    <Fragment>
      {label && <Text strong>{label}</Text>}
      <Dropdown
        overlay={Content}
        onOpenChange={() => setVisible(!visible)}
        open={visible}
        trigger={['click']}
        disabled={disabled}
      >
        <ButtonCustom>
          {checkedItems?.length ? (
            <Row
              justify="space-between"
              align="middle"
              className="w-full"
            >
              <div style={{ display: 'flex' }}>
                <p style={{ marginRight: '5px' }}>
                  {checkedItems?.length}
                </p>
                <p>
                  Selected
                </p>
              </div>
              <ICArrowDown />
            </Row>
          ) : (
            <Row className="w-full" justify="space-between" align="middle">
              <Text variant="label" style={{ color: '#AAA' }}>
                {placeholder}
              </Text>
              <ICArrowDown />
            </Row>
          )}
        </ButtonCustom>
      </Dropdown>
    </Fragment>
  )
}

export default SelectCheckbox

const ButtonCustom = styled(Button)`
  border: 1px solid rgb(170, 170, 170);
  border-radius: 8px;
  height: 38px;
  display: flex;
  align-items: center;
  padding-top: 4px;
  font-size: 14px;
  width: 100%;
  justify-content: space-between;

  &:hover, &:focus {
    color: rgb(170, 170, 170);
    border-color: rgb(170, 170, 170);
  }
`

const MenuStyled = styled(Menu)`
  border-radius: 8px;
  padding: 0px 0px 10px 0px;
  border: 1px solid #888;

  .ant-checkbox-wrapper {
    border-radius: 4px;
    padding: 0 5px;
    background: transparent;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    margin-left: 0;

    &:hover {
    background: #2771C7;
    color: #ffffff;

    .ant-checkbox-inner { border-color: #2bbecb; }
  }

  .ant-checkbox-inner { border-radius: 4px; border: 2px solid #2771C7; }
  .ant-checkbox { top: 0; }
  .ant-checkbox-checked::after { border: 1px solid #2bbecb; border-radius: 4px; }
}
`