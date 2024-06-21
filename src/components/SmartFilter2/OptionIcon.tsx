import React, { useState, useRef, useEffect } from 'react'
import { Tooltip, Text, Modal, Button } from 'pink-lava-ui'
import { CheckCircleFilled } from '@ant-design/icons'
import { FILTER_TYPES, FilterTypesInterface, OptionType } from 'src/configs/filterType'
import { FooterPane, List, HeaderList, Pane } from './styledComponent'
import { IconContext } from './index';

function SelectOptionIcon({ options, onChange, value }) {
  const [showDefineSelectModal, setDefineSelectModal] = useState(false)

  const [curValue, setCurValue] = useState<OptionType>(value || options[0])
  const prevValue = useRef(value)
  const [icon, setIcon] = useState(FILTER_TYPES[curValue]?.icon);
  const contextValue = React.useContext(IconContext);
  const resetIcon = contextValue.resetIcon;

useEffect(() => {
   setIcon(FILTER_TYPES[options[0]]?.icon);
}, [resetIcon]);

useEffect(() => {
  setIcon(FILTER_TYPES[curValue]?.icon);
}, [curValue]);

  const onCancel = () => {
    setCurValue(prevValue.current || options[0])
    setDefineSelectModal(false)
  }

  const onClickSave = () => {
    prevValue.current = curValue
    onChange(curValue)
    setDefineSelectModal(false)
  }

  return (
    <>
      <Pane>
        <Tooltip
          overlayInnerStyle={{ width: 'fit-content' }}
          color="#F4FBFC"
          title="Define Select Option"
        >
          <div onClick={() => setDefineSelectModal(true)}>{icon}</div>
        </Tooltip>
      </Pane>
      <Modal
        destroyOnClose
        title="Define Select Option"
        visible={showDefineSelectModal}
        onCancel={onCancel}
        content={
          <>
            <HeaderList>
              <Text variant="headingLarge" style={{ fontSize: 16, justifySelf: 'center' }}>
                Selection
              </Text>
              <Text variant="headingLarge" style={{ fontSize: 16 }}>
                Description
              </Text>
            </HeaderList>
            {options
              .map((opt: OptionType) => FILTER_TYPES[opt])
              .map((type: FilterTypesInterface) => (
                <List
                  key={type.code}
                  active={type.code === curValue}
                  onClick={() => setCurValue(type.code)}
                >
                  <div style={{ justifySelf: 'center' }}>{type.icon}</div>
                  <Text variant="headingSmall" style={{ fontSize: 16 }}>
                    {type.label}
                  </Text>
                  {type.code === curValue && <CheckCircleFilled style={{ color: '#00d458' }} />}
                </List>
              ))}
          </>
        }
        footer={
          <FooterPane>
            <Button onClick={onCancel} variant="tertiary">
              Cancel
            </Button>
            <Button onClick={onClickSave}>Save</Button>
          </FooterPane>
        }
      />
    </>
  )
}

export default SelectOptionIcon
