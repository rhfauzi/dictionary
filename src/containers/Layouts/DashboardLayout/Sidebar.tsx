import { Layout, Menu, Divider, Select } from 'antd'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { handleCompareUrlEnvWithConfigJson } from 'src/api/BaseApi'
import { useRouter } from 'next/router'
import { screenLink } from 'src/contexts/SidebarContext/screenMenu'

const { Sider } = Layout
const { SubMenu } = Menu

const BaseSider = styled(Sider)`
  &::-webkit-scrollbar {
    width: 4px !important;
    margin-right: 6px;
  }

  &::-webkit-scrollbar-track {
    margin-bottom: 20px !important;
  }

  &::-webkit-scrollbar-thumb {
    background: #fff !important;
    border-radius: 10px !important;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #fff !important;
  }

  .ant-layout-sider-children {
    margin-top: ${(p) => (p.collapsed ? '105px' : '0px')} !important;
  }

  .ant-layout-sider-trigger {
    width: 24px !important;
    height: 24px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2771c7 !important;
    color: ${(p: any) => (p.isBaseColorConfig ? p.baseColor : '#FFFFFF')} !important;
    border-radius: 4px;
    position: absolute;
    top: 29px;
    right: ${(p) => (p.collapsed ? '35%' : '20px')};
  }

  && {
    width: ${(p) => (p.collapsed ? '80px' : '244px')} !important;
    flex: unset !important;
    max-width: unset !important;
  }

  .ant-menu-item {
    color: #444444;
    span {
      display: ${(p) => (p.collapsed ? 'none' : 'block')} !important;
    }
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: #2771c7;
    font-weight: 600;
    color: white;
    img {
      filter: brightness(0) invert(1);
    }
  }

  .ant-menu-item: hover {
    background: #2771c7;
    font-weight: 600;
    color: white;
    img {
      filter: brightness(0) invert(1);
    }
  }

  .ant-menu-item svg {
    & path {
      color: red !important;
      fill: red !important;
    }
  }
` as any

const BaseMenu = styled(Menu)`
  border: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${(p: any) => p.baseColor};

  .ant-menu-item::after {
    border: none;
  }
` as any

const BaseMenuItem = styled(Menu.Item)`
  height: 36px;
  border-radius: 8px;
  padding: ${(p: any) => (p.collapsed ? '10px 10px' : '8px 12px')} !important;
  margin: 0 !important;
  display: flex;
  align-items: center;
  color: #444444;

  span:last-child {
    font-size: 14px;
    line-height: 22px;
    margin-left: 6px;
  }
` as any

const BaseSubMenu = styled(SubMenu)`
  .ant-menu-submenu-title {
    span {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      margin-left: 6px;
    }
    height: 36px;
    border-radius: 8px;
    padding: ${(p: any) => (p.collapsed ? '10px 10px' : '7px 12px')} !important;
    margin: 0 !important;
    display: flex;
    align-items: center;
    color: #444444;
  }

  && {
    width: ${(p: any) => (p.collapsed ? '36px' : '100%')} !important;
  }

  .ant-menu-item:hover {
    background: #ff34ac;
    color: white !important;
    border-radius: 8px;
  }

  &.ant-menu-submenu-active {
    background: transparent !important;

    .ant-menu-submenu-title {
      border-radius: 8px;
      background: #ff34ac;
      transition: background 0.2s linear;
    }
  }

  &.ant-menu-submenu-open.ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      background: #2771c7;
      border-radius: 8px;
      font-weight: 600;
    }
  }
  .ant-menu.ant-menu-sub {
    .ant-menu-item-active {
      width: 100% !important;
    }
  }

  .ant-menu-sub.ant-menu-inline {
    padding-left: 0;
    background-color: ${(p: any) => (p.baseColor ? p.baseColor : 'white')} !important;
    transition: background 0.2s linear;

    .ant-menu-item {
      background: transparent;
      transition: background 0.2s linear;

      &:hover {
        background: #ff34ac;
      }
    }

    .ant-menu-item-only-child {
      padding-left: 26px !important;
    }

    .ant-menu-item-selected {
      background: #2771c7;
      width: auto !important;
    }

    .ant-menu-item-active {
      background: #ff34ac;
      color: white !important;
    }
  }
` as any

const BaseDivider = styled(Divider)`
  margin: 8px 0 !important;
  border-top: 0.5px solid #f4fbfc;
`

const OverViewText = styled.div`
  // width: 220px;
  margin-top: 9px;
  margin-bottom: 6px;
  padding: 0px 10px !important;
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  align-items: center;
  text-transform: uppercase;
  color: #444444;
  display: ${(p: any) => (p.collapsed ? 'none' : 'flex')} !important;
` as any

const InputSelect = styled(Select)`
  height: 40px !important;
  width: 100%;
  background: transparent !important;
  box-sizing: border-box !important;
  border-radius: ${(p: any) => (p.rounded ? '64px' : '8px')} !important;

  .ant-select-selector {
    height: 36px !important;
    background: transparent !important;
    border: 1px solid ${(p: any) => (p.error ? '#ED1C24' : '#AAAAAA')} !important;
    border-color: ${(p: any) => (p.collapsed ? '#000000' : '#AAAAAA')} !important;
    box-sizing: border-box !important;
    border-radius: ${(p: any) => (p.rounded ? '64px' : '8px')} !important;
    display: flex;
    align-items: center;
    padding: 8px 12px !important;
    display: flex;
    color: ${(p: any) => (p.collapsed ? '#000000' : '#AAAAAA')} !important;
  }

  .ant-select-selection-item {
    padding: 16px 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  .ant-select-arrow {
    top: 12px;
    right: 12px;
    height: 24px;
    color: #fff;
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: transparent !important;
    box-shadow: none;
    outline: none;
  }

  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: transparent !important;
  }

  .rc-virtual-list-holder-inner {
    gap: 8px;
  }

  .ant-select-dropdown {
    padding: 0px !important;
  }
` as any

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin-top: 16px;
  margin-bottom: 19px;
  width: 160px;
  height: ;
`

type MenuModule = {
  key: string
  title: string
  icon?: string
  children?: { key: string; title: string }[]
}

export const Sidebar = ({ menu, defaultMenu, logo, subLogo, style = {} }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [openKeys, setOpenKeys] = useState([])
  const [activePage, setActivePage] = useState<string>('')
  const [baseColor, setBaseColor] = useState<string>('white')
  const [loading, setLoading] = useState<boolean>(true)
  const [isBaseColorConfig, setIsBaseColorConfig] = useState<boolean>(true)
  const router = useRouter()

  const getBaseColor = () => {
    handleCompareUrlEnvWithConfigJson('', true).then((e: any) => {
      const bg = e.NEXT_PUBLIC_BASE_COLOR
      if (bg === '' || bg === undefined) {
        setIsBaseColorConfig(false)
      } else {
        setIsBaseColorConfig(true)
        setBaseColor(`#${e.NEXT_PUBLIC_BASE_COLOR}`)
      }
      setLoading(false)
    })
  }

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)

    if (menu.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      const dataLatestOpenKey = latestOpenKey ? [latestOpenKey] : []
      setOpenKeys(dataLatestOpenKey)
    }
  }
  const handleSetActiveModuleOnLoad = () => {
    const activeModule = menu.find((module: MenuModule) =>
      module.children?.some((child) => child.key.toLowerCase() === localStorage.screenCode),
    )
    const openKey = activeModule ? activeModule.key : ''
    onOpenChange([openKey])
  }
  useEffect(() => {
    getBaseColor()
  }, [])

  useEffect(() => {
    setTimeout(() => handleSetActiveModuleOnLoad(), 800)
  }, [menu])

  useEffect(() => {
    setTimeout(() => {
      setActivePage(
        localStorage.getItem('screenCode') ? localStorage.getItem('screenCode') : defaultMenu,
      )
    }, 700)
  }, [activePage, router.asPath, menu])

  return loading ? (
    <></>
  ) : (
    <BaseSider
      theme={'light'}
      style={{
        overflow: 'auto',
        height: '100vh',
        scrollbarColor: 'white',
        scrollbarWidth: 'none',
        background: baseColor,
        width: '268px !important',
        paddingLeft: '18px',
        paddingRight: '18px',
        ...style,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      baseColor={baseColor}
      isBaseColorConfig={isBaseColorConfig}
    >
      {!collapsed && (
        <Logo>
          <Image width="50px" height="20px" src={subLogo} alt="sublogo" />

          <Image width="160px" height="72px" src={logo} alt="logo" />
        </Logo>
      )}

      <BaseMenu
        style={{ background: baseColor, alignItems: collapsed ? 'center' : 'start' }}
        theme="light"
        selectedKeys={[activePage]}
        openKeys={openKeys}
        baseColor={baseColor}
        onOpenChange={onOpenChange}
        mode="inline"
      >
        {menu?.map((menuItem) => {
          switch (menuItem?.type) {
            case 'divider':
              return <BaseDivider key={menuItem.key} />
            case 'title':
              return (
                <OverViewText style={{ marginTop: '8px' }} collapsed={collapsed} key={menuItem.key}>
                  {menuItem.title}
                </OverViewText>
              )
            case 'dropdown':
              return collapsed ? (
                <BaseSubMenu
                  title="Company"
                  icon={<menuItem.icon />}
                  key="1"
                  collapsed={true}
                  baseColor={baseColor}
                >
                  <InputSelect
                    key={menuItem.key}
                    options={menuItem?.items?.map((item) => ({
                      value: item?.id,
                      label: item?.name,
                    }))}
                    onChange={menuItem?.onChange}
                    value={menuItem && menuItem?.items?.name}
                    collapsed={collapsed}
                    defaultValue={menuItem && menuItem?.default?.name}
                  />
                </BaseSubMenu>
              ) : (
                <InputSelect
                  key={menuItem.key}
                  options={menuItem?.items?.map((item) => ({
                    value: item?.id,
                    label: item?.name,
                  }))}
                  onChange={menuItem?.onChange}
                  value={menuItem && menuItem?.default?.name}
                  // defaultValue={menuItem && menuItem?.default?.name}
                />
              )
            default:
              if (menuItem.children) {
                return (
                  <BaseSubMenu
                    key={menuItem.key}
                    icon={<menuItem.icon />}
                    title={!collapsed && menuItem.title}
                    collapsed={collapsed}
                    type="group"
                    baseColor={baseColor}
                  >
                    {menuItem.children.map((child) => (
                      <BaseMenuItem
                        key={child.key}
                        onClick={() => {
                          setActivePage(child.key)
                          child.onClick()
                        }}
                        collapsed={collapsed}
                      >
                        {child.title}
                      </BaseMenuItem>
                    ))}
                  </BaseSubMenu>
                )
              }
              return (
                <BaseMenuItem
                  key={menuItem.key}
                  icon={<menuItem.icon />}
                  onClick={() => {
                    setActivePage(menuItem.key)
                    menuItem.onClick()
                  }}
                  collapsed={collapsed}
                >
                  {menuItem.title}
                </BaseMenuItem>
              )
          }
        })}
      </BaseMenu>
    </BaseSider>
  )
}
