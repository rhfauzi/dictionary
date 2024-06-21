import React, { createContext, useState, useEffect } from 'react'
import { logoutSSO, refreshSSO, resolveSSO } from 'src/utils/openid'
import { useRouter } from 'next/router'
// import { Token, Grant } from 'svc-auth-sdk-node'
import { handleCompareUrlEnvWithConfigJson } from 'src/api/BaseApi'
import { Grant } from 'sdk-web/src/account-center/index'
import sideBar from '../../containers/PageLogin/sideBar.json'

type UserContextValueProps = {
  setOptionMenu: (optionMenu: any) => void
  optionsMenu: any
  setMenuActived: (menuActive: string) => void
  menuActived: any
  setMenuActivedName: (menuActiveName: string) => void
  menuActivedName: any
  setMenuActivedObject: (menuActiveName: any) => void
  menuActivedObject: any
  newOption: any
  headMenu: any[]
}

type UserContextProviderProps = {
  children: React.ReactElement
}

export const UserContext = createContext<UserContextValueProps>({
  setOptionMenu: (optionMenu) => false,
  optionsMenu: [],
  setMenuActived: (menuActive) => false,
  menuActived: 'PP01',
  setMenuActivedName: (menuActiveName) => false,
  menuActivedName: 'Pinus Merah Abadi, PT',
  setMenuActivedObject: (menuActivedObject) => false,
  menuActivedObject: { id: 'PP01', name: 'Pinus Merah Abadi, PT' },
  newOption: [],
  headMenu: [],
})

let redirectUri = null
if (typeof window !== 'undefined') {
  const [protocol, , domain] = window.location.href.toString().split('/')
  redirectUri = `${protocol}//${domain}/callback`
}
export const getConfig = async () => {
  const config = await handleCompareUrlEnvWithConfigJson(
    process.env.NEXT_PUBLIC_API_BASE_AUTH_ENV,
    true,
  )
  return {
    env: config['NEXT_PUBLIC_API_BASE_AUTH_ENV'],
    client_id: config['NEXT_PUBLIC_API_BASE_AUTH_CLIENT_ID'],
    client_secret: config['NEXT_PUBLIC_API_BASE_AUTH_CLIENT_SECRET'],
    redirect_uri: redirectUri || config['NEXT_PUBLIC_API_BASE_AUTH_CLIENT_REDIRECT_URI'],
  }
}

export default function UserContextProvider(props: UserContextProviderProps) {
  const router = useRouter()

  const [optionsMenu, setOptionMenu] = useState<any>([])
  const [menuActivedObject, setMenuActivedObject] = useState<any>({})
  const [menuActived, setMenuActived] = useState<String>('')
  const [menuActivedName, setMenuActivedName] = useState<String>('')
  const [newOption, setNewOption] = useState([])
  const [headMenu, setHeadMenu] = useState([])
  const [loading, setLoading] = React.useState(false)
  const [authorizationCode, setAuthorizationCode] = React.useState(null)
  const [dotConfig, setDotConfig] = React.useState(null)

  useEffect(() => {
    const verificationProfile = async () => {
      const config = await getConfig()
      console.log('config', config)
      const newAuth = new Grant.AuthorizationCode(config)
      const token = localStorage.getItem('token')
      setAuthorizationCode(newAuth)
      try {
        if (token) {
          // const response = await resolveSSO(token)
          // if (response === false) {
          //   const newToken = await refreshSSO()
          //   if (newToken !== false) {
          //     localStorage.setItem('token', newToken.access_token)
          //     localStorage.setItem('id_token', newToken.id_token)
          //     localStorage.setItem('refresh_token', newToken.refresh_token)
          //     localStorage.setItem('sideBarMenu', JSON.stringify(sideBar))
          //     // getCompany(newToken.access_token)
          //     // setTokenRef(newToken.access_token)
          //   } else {
          //     logoutSSO()
          //   }
          // }

          if (window.location.pathname === '/') {
            window.location.assign('/hc/dashboard')
            setLoading(false)
          } else if (router.pathname.includes('login')) {
            setLoading(false)
          } else if (window.location.pathname.includes('callback')) {
            window.location.assign('/hc/dashboard')
            setLoading(false)
          } else if (window.location.pathname === '/hc') {
            window.location.assign('/hc/dashboard')
            setLoading(false)
          }
        } else {
          const res = await newAuth.callback({
            current_uri: config.redirect_uri,
            ui_debug: false,
          })
          if (res?.error) {
            if (!router.pathname.includes('login')) {
              logoutSSO()
              setLoading(false)
            } else {
              // setReturnComponent(true);
              setLoading(false)
            }
          } else {
            localStorage.setItem('token', res.access_token)
            localStorage.setItem('id_token', res.id_token)
            localStorage.setItem('refresh_token', res.refresh_token)
            localStorage.setItem('sideBarMenu', JSON.stringify(sideBar))
            if (window.location.pathname.includes('callback')) {
              window.location.assign('/eds/sales')
              setLoading(false)
            }
            setLoading(false)
          }
        }
      } catch (e) {
        // return
        if (!router.pathname.includes('login')) {
          logoutSSO()
          setLoading(false)
        } else {
          setLoading(false)
        }
      }
    }

    verificationProfile()
  }, [])

  useEffect(() => {
    // const payload = {
    //   env: process.env.NEXT_PUBLIC_API_BASE_AUTH_ENV,
    //   client_id: process.env.NEXT_PUBLIC_API_BASE_AUTH_CLIENT_ID,
    //   client_secret: process.env.NEXT_PUBLIC_API_BASE_AUTH_CLIENT_SECRET,
    //   redirect_uri: process.env.NEXT_PUBLIC_API_BASE_AUTH_CLIENT_REDIRECT_URI,
    // }
    // setAuthorizationCode(new Grant.AuthorizationCode.Browser(payload))
  }, [])

  useEffect(() => {
    if (menuActived === '') {
      setMenuActived(localStorage.getItem('companyCode'))
    }

    if (menuActivedName === '') {
      setMenuActivedName(localStorage.getItem('companyName'))
    }
    if (
      Object.keys(menuActivedObject || {}).length === 0
      // hasCookie('token_code') &&
      // hasCookie('refresh_token')
    ) {
      setMenuActivedObject(JSON.parse(localStorage.getItem('companySelectedObject')))
    }
    if (optionsMenu?.length === 0) {
      const neWoptions = JSON.parse(localStorage.getItem('optionsComp'))
      setOptionMenu(neWoptions?.company)
      setNewOption(neWoptions?.company)
    }
    if (headMenu?.length === 0) {
      setHeadMenu(JSON.parse(localStorage.getItem('headerMenu')))
    }
  }, [menuActived, menuActivedName, optionsMenu, menuActivedObject])

  useEffect(() => {
    // if (hasCookie('token_code') && hasCookie('refresh_token')) {
    if (optionsMenu?.length !== 0 && menuActived !== '') {
      const activecompany = optionsMenu?.find((optionCompany) => optionCompany.id === menuActived)
      if (activecompany !== 'undefined') {
        const companyName = localStorage.getItem('companyName')
        const companyCode = localStorage.getItem('companyCode')
        setMenuActivedName(activecompany?.name || '')
        setMenuActivedObject({
          id: activecompany?.name || '',
          name: activecompany?.id || '',
        })
        localStorage.setItem('companyName', activecompany?.name || companyName || '')
        localStorage.setItem('companyCode', activecompany?.id || companyCode || '')
        localStorage.setItem(
          'companySelectedObject',
          JSON.stringify({
            id: activecompany?.id || '',
            name: activecompany?.name || '',
          }),
        )
      }
    }
    // else if (newOption?.length !==0 )  {
    //   const activecompany = newOption?.find((optionCompany) => optionCompany.id === menuActived)
    //   if (activecompany !== 'undefined') {
    //     setMenuActivedName(activecompany?.name || '')
    //     setMenuActivedObject({
    //       id: activecompany?.name || '',
    //       name: activecompany?.id || '',
    //     })
    //     localStorage.setItem('companyName', activecompany?.name || '')
    //     localStorage.setItem('companyCode', activecompany?.id || '')
    //     localStorage.setItem(
    //       'companySelectedObject',
    //       JSON.stringify({
    //         id: activecompany?.id || '',
    //         name: activecompany?.name || '',
    //       }),
    //     )
    //   }
    // }
    // }
  }, [menuActived])

  return (
    <UserContext.Provider
      value={{
        setOptionMenu,
        optionsMenu,
        menuActived,
        setMenuActived,
        menuActivedName,
        setMenuActivedName,
        menuActivedObject,
        setMenuActivedObject,
        newOption,
        headMenu,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
