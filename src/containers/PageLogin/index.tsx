import { Card, Form, Input, Spin, message } from 'antd'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button, Text, Spacer, Layout } from 'pink-lava-ui'
import { useState, useContext } from 'react'
import { UserContext } from 'src/contexts/UserContext'
import { SideBarContext } from 'src/contexts/SidebarContext'
import { setCookie } from 'cookies-next'
import LoginLayout from 'src/containers/Layouts/LoginLayout'

export default function PageLogin() {
  const urlLogin = process.env.NEXT_PUBLIC_LOGIN_URL_DEV
  const urlGetCompany = process.env.NEXT_PUBLIC_COMPANY_URL_DEV
  const urlGetMenu = process.env.NEXT_PUBLIC_MENU_URL_DEV

  const { setOptionMenu, setMenuActived, setMenuActivedName, setMenuActivedObject } =
    useContext(UserContext)

  const { setSidebarMenuSession } = useContext(SideBarContext)

  const [showLoader, setShowLoader] = useState(false)
  const [form] = Form.useForm()

  const router = useRouter()
  var querystring = require('querystring')

  const onFinish = (values: any) => {
    setShowLoader(true)
    axios
      .post(urlLogin, querystring.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          origin: 'https://kleenquip.edot.co.id/',
        },
      })
      .then((res) => {
        axios
          .get(urlGetCompany, {
            headers: {
              Authorization: `Bearer ${res?.data?.token_code}`,
            },
          })
          .then((resMenu) => {
            if (resMenu?.data?.data?.length > 0) {
              axios
                .get(`${urlGetMenu}?company_id=${resMenu?.data?.data?.[0]?.code}`, {
                  headers: {
                    Authorization: `Bearer ${res?.data?.token_code}`,
                  },
                })
                .then((resSidebar) => {
                  localStorage.setItem('sideBarMenu', JSON.stringify(resSidebar?.data?.data))
                  setSidebarMenuSession(resSidebar?.data?.data)

                  const company = resMenu?.data?.data?.map(({ code, name }) => ({
                    id: code,
                    name: name,
                  }))
                  localStorage.setItem('companyCode', resMenu?.data?.data?.[0]?.code || '')
                  localStorage.setItem('companyName', resMenu?.data?.data?.[0]?.name || '')
                  localStorage.setItem(
                    'companySelectedObject',
                    JSON.stringify({
                      id: resMenu?.data?.data?.[0]?.code || '',
                      name: resMenu?.data?.data?.[0]?.name || '',
                    }),
                  )

                  setOptionMenu(company)
                  setMenuActived(resMenu?.data?.data?.[0]?.code)
                  setMenuActivedName(resMenu?.data?.data?.[0]?.name)
                  setMenuActivedObject({
                    id: resMenu?.data?.data?.[0]?.code || '',
                    name: resMenu?.data?.data?.[0]?.name || '',
                  })

                  // localStorage.setItem('token', res?.data?.token_code)
                  setCookie('expired_date', res?.data?.expired_date, { maxAge: 86400 })
                  setCookie('refresh_token', res?.data?.refresh_token, { maxAge: 86400 })
                  setCookie('token_code', res?.data?.token_code, { maxAge: 86400 })
                  router.push('/sales')
                })
            } else {
              message.error('user not found')
              setShowLoader(false)
            }
          })
      })
      .catch((error) => {
        if (error.response) {
          // message.error(error.response.data.data.message)
          message.error('user not found')
        } else {
          message.error(error.message)
        }
        setShowLoader(false)
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #FFFFFF 18.39%, #D5FAFD 150.89%)',
      }}
    >
      <Image src={'/hc/icons/logo-nabati-blue.svg'} width={200} height={200} />

      <Card
        style={{
          width: 450,
          borderRadius: 24,
          boxShadow: '0px 4px 16px rgba(170, 170, 170, 0.15)',
          padding: 15,
        }}
      >
        <Spin spinning={showLoader}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Text variant={'h4'}>Welcome Back!</Text>
            <p>login to enter dashboard</p>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              style={{ width: '100%' }}
              layout="vertical"
              requiredMark={false}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Spacer size={30} />
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0, fontWeight: 'bolder' }}
                label="Username"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  style={{ borderRadius: 8, border: '1px solid #AAAAAA', padding: 10 }}
                  placeholder="Type your NIK, Email, Phone Number"
                />
              </Form.Item>

              <Spacer size={20} />
              <Form.Item
                style={{ marginBottom: 0, paddingBottom: 0, fontWeight: 'bolder' }}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  style={{ borderRadius: 8, border: '1px solid #AAAAAA', padding: 10 }}
                  placeholder="Type your password"
                />
              </Form.Item>
              <Spacer size={10} />

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <a style={{ color: '#EB008B' }} href="">
                  Forgot password
                </a>
              </div>
              <Spacer size={30} />
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Login
                </Button>
              </Form.Item>
            </Form>

            <span>
              New user? <a style={{ color: '#EB008B' }}>Create an account</a>
            </span>
          </div>
        </Spin>
      </Card>

      {/* <Spacer size={40} />
    <div style={{ position: 'absolute', bottom: 0 }}>
      <Image src={'/hc/icons/footer-login-dark.svg'} layout="fill" />
      <Image src={'/hc/icons/footer-login-light.svg'} layout="fill" />
    </div> */}
    </Layout>
  )
}
