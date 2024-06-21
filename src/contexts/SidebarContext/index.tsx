/* eslint-disable no-else-return */
import React, { createContext, useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { screenLink } from './screenMenu'

type SidebarContextValueProps = {
  setSidebarMenuSession: (optionMenu: any) => void
  sidebarMenuSession: any
  setModuleActive: (module: string) => void
  moduleActive: any
  sidebarMenu: any
  sidebarMenuAccess: any
}

type SidebarContextProviderProps = {
  children: React.ReactElement
}

export const SideBarContext = createContext<SidebarContextValueProps>({
  setSidebarMenuSession: (optionMenu) => false,
  sidebarMenuSession: [],
  setModuleActive: (module) => false,
  moduleActive: [],
  sidebarMenu: [],
  sidebarMenuAccess: [],
})

export default function UserContextProvider(props: SidebarContextProviderProps) {
  const [sidebarMenuSession, setSidebarMenuSession] = useState<any>([])
  const [moduleActive, setModuleActive] = useState<string>('Sales')
  const [sidebarMenu, setSidebarMenu] = useState<any>([])
  const [sidebarMenuAccess, setSidebarMenuAccess] = useState<any>([])
  const router = useRouter()
  useEffect(() => {
    if (localStorage.hasOwnProperty('sideBarMenu')) {
      setSidebarMenuSession(JSON.parse(localStorage.getItem('sideBarMenu')))
    }
  }, [])

  useEffect(() => {
    const menuFilter = sidebarMenuSession.find((menuSidebar) => menuSidebar.name === moduleActive)
    if (typeof menuFilter !== 'undefined') {
      const returnSidebar = menuFilter.children.map((item: any) => {
        if (item?.type === 'title') {
          return {
            type: item?.type,
            title: item?.title,
          }
        } else if (item?.type === 'submodule') {
          if (item?.menus?.length > 1) {
            const submenu = item?.menus?.map((itemSubmenu: any) => {
              let redirect = ''
              const linkScreen = screenLink.find((link) => link.screenID === itemSubmenu.screen)
              if (typeof linkScreen !== 'undefined') {
                redirect = linkScreen.link
              }
              return {
                key: itemSubmenu.screen || '',
                title: itemSubmenu.title || '',
                content: () => itemSubmenu.title || '',
                onClick: () => {
                  // Router.push(redirect)
                  if (moduleActive === 'HC') {
                    window.location.href = redirect
                  } else {
                    Router.push(redirect)
                  }
                },
              }
            })
            return {
              key: item?.title,
              title: item?.title,
              icon: () => (
                <img
                  src={`/hc/icons/black/${item.icon}.svg`}
                  className="icon-menu white-icon hc-icon"
                  alt=""
                  height={16}
                />
              ),
              children: submenu,
            }
          } else {
            let redirect = ''
            const linkScreen = screenLink.find((link) => link.screenID === item?.menus?.[0]?.screen)
            if (typeof linkScreen !== 'undefined') {
              redirect = linkScreen.link
            }
            return {
              key:
                item?.menus[0]?.title === 'Dashboard' ? 'sls.dashboard' : item?.menus?.[0]?.screen,
              type: 'menu',
              title: item?.menus[0]?.title || item?.title,
              icon: () => (
                <img
                  src={`/hc/icons/black/${item.icon}.svg`}
                  // className="icon-menu white-icon"
                  alt=""
                  height={16}
                />
              ),
              content: () => item?.menus?.[0]?.title || item?.menus?.title,
              onClick: () => {
                // Router.push(redirect)
                if (moduleActive === 'HC') {
                  window.location.href = redirect
                } else {
                  Router.push(redirect)
                }
              },
            }
          }
        }
      })

      const returnSidebarAccess = []
      menuFilter.children.map((item: any) => {
        if (item?.type === 'title') {
          returnSidebarAccess.push({
            type: item?.type,
            title: item?.title,
            screen: '-',
            url: '-',
          })
        } else if (item?.type === 'submodule') {
          return item?.menus?.map((itemSubmenu: any) => {
            let redirect = '-'
            const linkScreen = screenLink.find((link) => link.screenID === itemSubmenu.screen)
            if (typeof linkScreen !== 'undefined') {
              redirect = linkScreen.link
            }
            returnSidebarAccess.push({
              type: 'submodule',
              title: itemSubmenu.title,
              screen: itemSubmenu.screen || '-',
              url: redirect,
            })
          })
        }
      })
      setSidebarMenu(returnSidebar)
      setSidebarMenuAccess(returnSidebarAccess)
    }
  }, [sidebarMenuSession, moduleActive])

  return (
    <SideBarContext.Provider
      value={{
        setSidebarMenuSession,
        sidebarMenuSession,
        setModuleActive,
        moduleActive,
        sidebarMenu,
        sidebarMenuAccess,
      }}
    >
      {props.children}
    </SideBarContext.Provider>
  )
}
