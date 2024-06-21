import React, { useState, useEffect, useContext } from 'react'
import { Layout, MenuLogout, Spacer } from 'pink-lava-ui'
import Router, { useRouter } from 'next/router'
import ICAccount from 'src/assets/icons/ic-avatar-default.svg'
import ICAccountSetting from 'src/assets/icons/ic-setting.svg'
import ICCompany from 'src/assets/icons/ic-company.svg'
import ICChangeLanguage from 'src/assets/icons/ic-globe.svg'
import ICLogout from 'src/assets/icons/ic-logout.svg'
import { notificationItems } from 'src/configs/menus'
import { Header } from 'src/components/Header'
import { UserContext } from 'src/contexts/UserContext'
import { SideBarContext } from 'src/contexts/SidebarContext'
import { ICArrowDownWhite, ICInventory, ICMenu } from 'src/assets'
import { logoutSSO } from 'src/utils/openid'
import { screenLink } from 'src/contexts/SidebarContext/screenMenu'
import axios from 'axios'
import { handleCompareUrlEnvWithConfigJson } from 'src/api/BaseApi'
import { matchSorter } from 'match-sorter'
import { Notification } from 'src/components/Notification'
import { COLORS } from 'src/const/COLORS'
import { Sidebar } from './Sidebar'

import {
  WrapeprProfile,
  WrapperMenuLogout,
  MenuDropdown,
  TextName,
  TextRole,
} from './styledComponents'

const flexStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  paddingBottom: '1rem',
  fontSize: '14px',
  cursor: 'pointer',
  colors: '#fff',
}

export default function DashboardLayout(props: React.PropsWithChildren<React.ReactNode>) {
  const urlEpc = process.env.NEXT_PUBLIC_BASE_URL_EPC
  const { menuActivedObject, setMenuActived, optionsMenu } = useContext(UserContext)
  const { setModuleActive, sidebarMenu, sidebarMenuSession } = useContext(SideBarContext)
  const { children } = props
  const router = useRouter()
  const [defaultMenu, setDefaultMenu] = useState<string>('')
  const [current, setCurrent] = useState('0')
  const [isMenu, setIsMenu] = useState('')
  const [isUser, setIsUser] = useState('')
  const [isRole, setIsRole] = useState('')

  // const { setModuleActive, sidebarMenu } = useContext(SideBarContext)
  // const { children } = props
  // const urlLogout = process.env.NEXT_PUBLIC_LOGOUT_URL_DEV
  // const router = useRouter()

  async function LogoutClear() {
    const config = await handleCompareUrlEnvWithConfigJson(urlEpc, true)
    axios
      .request({
        timeout: 3000,
        method: 'POST',
        url: `${config['NEXT_PUBLIC_BASE_URL_EPC']}/auth/logout`,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((res) => {
        console.log(res)
      })
  }

  const [sidebarMenuActive, setSidebarMenuActive] = useState([
    {
      type: 'dropdown',
      items: optionsMenu,
      icon: ICMenu,
      onChange: (value) => setMenuActived(value),
      default: menuActivedObject,
    },
    {
      key: 'dashboard',
      type: 'menu',
      title: 'Dashboard',
      icon: ICInventory,
      content: () => 'Dashboard',
      onClick: () => Router.push(`/${router.asPath.split('/')[1]}`),
    },
  ])

  const headerMenuUrl = [
    { key: 'conf', label: 'Config', url: '/dashboard?menu=config' },
    { key: 'mdm', label: 'Master Data Management', url: '/dashboard?menu=mdm' },
    { key: 'sls', label: 'Sales', url: '/eds/sales' },
    { key: 'log', label: 'Logistic', url: '/eds/logistic' },
    { key: 'fico', label: 'Finance', url: '/fico' },
    { key: 'mkt', label: 'Marketing', url: '/eds/marketing' },
    { key: 'proc', label: 'Procurement', url: '/proc' },
    { key: 'vim', label: 'VIM', url: '/vim' },
    { key: 'uct', label: 'Upload Center', url: '/uct/upload-center' },
    { key: 'hc', label: 'HC', url: '/hc' },
  ]
  const headerMenuWithUrl = sidebarMenuSession
    ?.filter((hm) => !hm.name?.toLowerCase()?.includes('mobile'))
    .sort((a, b) => a.index - b.index)
    .map((headerMenu) => ({
      key: headerMenu.key,
      index: headerMenu.index,
      label: headerMenu.name,
      url: headerMenuUrl.find((hmu) => hmu.key === headerMenu.key)?.url,
    }))

  useEffect(() => {
    if (router.asPath.split('/')[2] !== 'report-sales') {
      const menuIndex = sidebarMenu.findIndex((i) => i.path === `/${router.asPath.split('/')[1]}`)
      sessionStorage.removeItem('filterSales')
      setCurrent(menuIndex.toString())
    }
    if (`${router.asPath.split('/')[1]}` === 'logistic') {
      setModuleActive('Logistic')
    } else if (`${router.asPath.split('/')[1]}` === 'marketing') {
      setModuleActive('Marketing')
    } else if (`${router.basePath.split('/')[1]}` === 'hc') {
      setModuleActive('HC')
    } else {
      setModuleActive('Sales')
    }
  }, [router.asPath])

  useEffect(() => {
    const linkScreen = sidebarMenu.find((link) => link.key === 'dashboard')

    if (typeof linkScreen === 'undefined') {
      setSidebarMenuActive([
        {
          type: 'dropdown',
          items: optionsMenu,
          icon: ICMenu,
          onChange: (value) => setMenuActived(value),
          default: menuActivedObject,
          content: () => 'Dashboard',
          onClick: () => Router.push(`/${router.asPath.split('/')[1]}`),
        },
        // {
        //   key: 'dashboard',
        //   type: 'menu',
        //   title: 'Dashboard',
        //   icon: ICInventory,
        //   content: () => 'Dashboard',
        //   onClick: () => Router.push(`/${router.asPath.split('/')[1]}`),
        // },
        ...sidebarMenu,
      ])
    } else {
      setSidebarMenuActive([
        {
          type: 'dropdown',
          items: optionsMenu,
          icon: ICInventory,
          onChange: (value) => setMenuActived(value),
          default: menuActivedObject,
        },
        ...sidebarMenu,
      ])
    }

    screenLink.map((t: any) => {
      const path = `${router.basePath}${router.asPath}`
      if (path === t.link) {
        return localStorage.setItem('screenCode', t.screenID)
      }
      if (router.asPath === '/dashboard') {
        setDefaultMenu('dashboard')
        return localStorage.setItem('screenCode', 'dashboard')
      }
    })
    setIsUser(localStorage.getItem('username'))
    setIsRole(localStorage.getItem('role'))
  }, [sidebarMenu, optionsMenu, router.asPath, menuActivedObject])

  const handleLogout = () => {
    LogoutClear()
    logoutSSO()
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMenu(
        `/${window.location.pathname.includes('callback') ? 'hc' : router.asPath.split('/')[1]}`,
      )
    }
  }, [router.asPath])

  useEffect(() => {
    screenLink.map((t: any) => {
      const path = `${router.basePath}${router.asPath}`
      if (path === t.link) {
        setDefaultMenu(t.screenID)
        return localStorage.setItem('screenCode', t.screenID)
      }
    })
  }, [])

  return (
    <Layout className={'ant-layout ant-layout-has-sider'} style={{ height: '100vh' }}>
      {router?.asPath && router?.asPath?.split('/')[2]?.includes('print-summary') ? (
        <></>
      ) : (
        <Sidebar
          logo="/hc/icons/logo-nabati-merah.svg"
          subLogo="/hc/icons/powered-by-edot-hitam.svg"
          menu={sidebarMenuActive}
          // menu={sidebarMenu}
          defaultMenu={defaultMenu}
          // logoSubtitle={''}
        />
      )}
      <Layout className="site-layout" style={{ height: '100vh', overflow: 'auto' }}>
        {router?.asPath && router?.asPath?.split('/')[2]?.includes('print-summary') ? (
          <></>
        ) : (
          <Header
            onClick={(e) => {
              const headerMenu = headerMenuWithUrl[e.key].url
              window.location.href = headerMenu
            }}
            selectedKeys={[
              `${matchSorter(headerMenuWithUrl, 'hc', { keys: ['label'] })[0]?.indexOf}`,
            ]}
            items={headerMenuWithUrl}
          >
            <div
              style={{
                display: 'flex',
                paddingTop: '.7rem',
                marginBottom: '.78rem',
                background: '#2771C7',
              }}
            >
              <Notification
                items={notificationItems}
                totalUnread={undefined}
                viewAll={undefined}
                markAsRead={undefined}
              />
              <Spacer size={15} />
              <MenuLogout
                menu={
                  <WrapperMenuLogout>
                    <WrapeprProfile>
                      <ICAccount />
                      <div>
                        <TextName>{isUser || 'Admin'}</TextName>
                        <TextRole>{isRole || 'Super Admin'}</TextRole>
                      </div>
                    </WrapeprProfile>
                    <a
                      style={{ color: COLORS.blue.regular }}
                      target="_blank"
                      href="https://accounts.edot.id/infopribadi"
                      rel="noopener noreferrer"
                    >
                      <div style={flexStyles}>
                        <ICAccountSetting />
                        <p>Account Settings</p>
                      </div>
                    </a>
                    <div style={flexStyles}>
                      <ICCompany />
                      <p>Company List</p>
                    </div>
                    <div style={flexStyles}>
                      <ICChangeLanguage />
                      <p>Change Language</p>
                    </div>
                    <div style={flexStyles} onClick={handleLogout}>
                      <ICLogout />
                      <p>Logout</p>
                    </div>
                  </WrapperMenuLogout>
                }
              >
                <MenuDropdown>
                  <div
                    style={{
                      gap: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '14px',
                    }}
                  >
                    <ICAccount size={64} />
                    <p>{isUser?.length > 10 ? `${isUser?.slice(0, 7)}…` : 'Admin'}</p>
                  </div>
                  <ICArrowDownWhite />
                </MenuDropdown>
              </MenuLogout>
            </div>
          </Header>
        )}

        <main style={{ position: 'relative', padding: '20px 20px' }}>
          {/* <div style={{ padding: '20px' }}> */}
          {/* <Spacer size={12} /> */}
          {children}
          {/* </div> */}
        </main>
      </Layout>

      {/* <ModalPermission
        isHavePermission={modalPermission}
        close={() => {
          setModalPermission(false)
        }}
      /> */}
    </Layout>
  )
}
