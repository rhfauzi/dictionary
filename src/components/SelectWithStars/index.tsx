/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect, useState } from 'react'
import { Text } from 'pink-lava-ui'
import { Checkbox, Dropdown, Input, Menu, Row, Spin, Button, Col, Rate } from 'antd'
import styled from 'styled-components'
import { ICArrowDown, ICStarEmpty, ICStarFull } from 'src/assets'
import { If, Then } from 'react-if'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import { NoData } from 'src/components'

interface SelectWithStarsProps {
    label?: string
    options?: any[]
    disabled?: boolean
    isLoading?: boolean
    isSearch?: boolean
    placeholder?: string
    callbackSearch?: (e: string) => void
    callbackSelect?: (data: any[]) => void
    value?: any[]
    isAll?: boolean
}

const SelectWithStars = ({
  label,
  options = [], // sampel data [{ id: 1, value: '', label: '', rank: 0, checked: false }]
  disabled,
  isLoading,
  isSearch,
  placeholder,
  callbackSelect,
  callbackSearch,
  value,
  ...props
}: SelectWithStarsProps) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [checkedItems, setCheckedItems] = useState([])

  const onChangeSelect = (checkedValues: any) => {
    // when click on checkbox
    let rank = 0
    let checked = false
    if (checkedItems.includes(checkedValues)) {
      setCheckedItems((prev) => prev.filter((item) => item !== checkedValues))
      rank = 0
      checked = false
    } else {
      setCheckedItems((prev) => [...prev, checkedValues])
      rank = 5
      checked = true
    }

    const newCheckedData = value.map((item: any) => {
      if (item.value === checkedValues) { return { ...item, rank, checked } }
      return item
    })
    callbackSelect(newCheckedData)
  }

  const onChangeRate = (checkedValues: any, rank: number) => {
    // when click on star
    if (checkedItems.includes(checkedValues) && rank === 0) {
      setCheckedItems((prev) => prev.filter((item) => item !== checkedValues));
    } else {
      setCheckedItems((prev) => [...prev, checkedValues]);
    }

    const newCheckedData = value.map((item: any) => {
      if (item.value === checkedValues) { return { ...item, rank, checked: true } }
      return item
    })
    callbackSelect(newCheckedData)
  }

  useEffect(() => {
    setCheckedItems(value.filter((item) => item.checked).map((item) => item.value))
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

        <SelectionInside
          className='scrollbar-vertical'
          style={{ maxHeight: 160, overflowY: 'auto' }}>
          <If condition={isLoading}>
            <Then>
              <div style={{ position: 'absolute', bottom: 10, left: '50%' }}>
                <Spin indicator={<LoadingOutlined />} />
              </div>
            </Then>
          </If>

          {options?.length > 0 ? (
            <>
              <Row style={{ marginTop: 10 }}>
                <Col xs={12} xl={12}>
                  <div>Competencies</div>
                </Col>
                <Col xs={12} xl={12}>
                  <div>Level 1-5</div>
                </Col>
              </Row>
              <Checkbox.Group
                style={{ width: '100%' }}
                value={checkedItems}
              >
                {options?.map((item: any, idx: number) => (
                  <div key={idx} className='section-row' style={{ width: '100%', display: 'flex' }}>
                    <div style={{ width: '50%' }}>
                      <Checkbox
                        key={idx}
                        name={item.value}
                        value={item.value}
                        checked={true}
                        style={{ width: '100%', paddingTop: '2px' }}
                        onChange={() => onChangeSelect(item.label)}
                      >
                        <div style={{ paddingTop: '5px' }}>{item.label}</div>
                      </Checkbox>
                    </div>
                    <div style={{ width: '50%' }}>
                      <Rate
                        allowClear
                        character={(e) => {
                          if ((e.index + 1) <= e.value) {
                            return <ICStarFull />
                          }
                          return <ICStarEmpty />
                        }}
                        defaultValue={0}
                        value={value[idx]?.rank}
                        onChange={(val) => onChangeRate(item.label, val)}
                        style={{ color: '#FFB400' }}
                        {...props}
                      />
                    </div>
                  </div>
                ))}
              </Checkbox.Group>
            </>
          ) : (
            <NoData
              subtitle="The data is not available at this time"
              title={`No Data ${label}`}
            />
          )}
        </SelectionInside>
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

export default SelectWithStars

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

const SelectionInside = styled.div`
.ant-checkbox-group .ant-checkbox-wrapper:hover {
  background: #ffffff00 !important;
}
.section-row:hover {
  background: #2771C7 !important;
}
` as any

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
  }

  .ant-checkbox-inner { border-radius: 4px; }
  .ant-checkbox { top: 0; }
  .ant-checkbox-checked::after { border: 1px solid #2771C7 !important; }

  .ant-checkbox + span { width: 100%; }
}
`