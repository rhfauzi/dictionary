import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Loader from 'src/components/Loader'
import DashboardLayout from 'src/containers/Layouts/DashboardLayout'
import { UserContext } from 'src/contexts/UserContext'
import PageCannotAccessed from 'src/containers/PageCannotAccessed'
import { sideBarMenu } from '../../../configs/menus/dummyDataMenu'

export default function AppLayout({ Component, pageProps }) {
  const { menuActived } = useContext(UserContext)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [pageShow, setPageShow] = useState(true)

  const handleStart = () => {
    setLoading(true)
  }

  const handleStop = () => {
    setLoading(false)
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  useEffect(() => {
    handleStart()
    setTimeout(() => {
      handleStop()
    }, 1000)
  }, [menuActived])

  const handleGetCompany = async () => {
    handleStart()
  }

  useEffect(() => {
    if (localStorage.getItem('token') !== '' || null) {
      handleGetCompany()
    }

    localStorage.setItem('companyCode', 'PP01')
    localStorage.setItem('companyName', 'PT. Kleen Quip Indonesia')
    localStorage.setItem('sideBarMenu', JSON.stringify(sideBarMenu))
    localStorage.setItem(
      'companySelectedObject',
      JSON.stringify({ id: 'PP01', name: 'PT. Kleen Quip Indonesia' }),
    )
    // localStorage.setItem('screenCode', 'sls.otc.billing')
    // localStorage.setItem('config_language', 'en-US')
    localStorage.setItem('config_language', 'id-ID')
    localStorage.setItem('id_token', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imo5YjNtZms2dHlwcENGWVdud1dEdVp6TENnWFZlcHlmODNtekpxTWpiNnVONUFUeWp3dVBLakE3VWNMNFdIcHAifQ.eyJzdWIiOiIyMTI3MzQiLCJiaXJ0aGRhdGUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsImdlbmRlciI6Im1hbGUiLCJnaXZlbl9uYW1lIjoiIiwibG9jYWxlIjoiIiwibWlkZGxlX25hbWUiOiIiLCJuYW1lIjoiU3VwZXIgQWRtaW4iLCJuaWNrbmFtZSI6IiIsInBpY3R1cmUiOiIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJrbGVlbnF1aXBfdXNlciIsInByb2ZpbGUiOiJodHRwczovL2Fwb2xsby1kZXYuZWRvdC5pZC9wcm9maWxlL2tsZWVucXVpcF91c2VyIiwidXBkYXRlZF9hdCI6MTcxNDAzMDQ1MjM4Niwid2Vic2l0ZSI6IiIsInpvbmVpbmZvIjoiIiwiYXRfaGFzaCI6Il94YlYyT3Ryd2N0WG96V2FmTGx5R0EiLCJhdWQiOiJlcGMtbmFiYXRpc25hY2std2ViYXBwIiwiZXhwIjoxNzE0MDMwODIwLCJpYXQiOjE3MTQwMzA1MjAsImlzcyI6Imh0dHBzOi8vY3JvbnVzLWRldi5lZG90LmlkIn0.nwmq-B81yCMYwqGrjfmRaJfMCdVaOE9oJLo2vry08tKe6AVzRf5aXV266YlkgucosTCDJlEhPRNrAvGORSKD7CyrgCP0NXHezXTmjctsOZrWnCMq6LtQ8TfbjmqDHJ2hZYS9gMqKmJHC-gWeY7zfrwteIfJKGhmt2Q6xEaD8uJIdan5TxbiiuEbceTW7J5B44SKMDj5geHe4J5zenOVmKlS54G3W8vG7aIN3RUzvE8S0UQfxSgf6ZYgOsuIhjg0dRr280_rxdu8sX8MmwDTNHNLdkjMUm2MI13kSzh8lxAsH2ZlmPvIgvrWQHysgIBYiYN9W5wP6FMjWgJLJObw14g')
    localStorage.setItem('token', 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCIsImtpZCI6Imo5YjNtZms2dHlwcENGWVdud1dEdVp6TENnWFZlcHlmODNtekpxTWpiNnVONUFUeWp3dVBLakE3VWNMNFdIcHAifQ.eyJwcmVmZXJyZWRfdXNlcm5hbWUiOiJrbGVlbnF1aXBfdXNlciIsImN1cnJlbnRfd29ya3NwYWNlIjoiIiwid29ya3NwYWNlcyI6WyIyMjM4ODAiLCIyMjM4ODEiXSwidXBkYXRlZF9hdCI6MTcxNDAzMDQ1MjM4NiwianRpIjoiaVd2aE9DelFqdWhhUFIzQjB1N2kwIiwic3ViIjoiMjEyNzM0IiwiaWF0IjoxNzE0MDMwNTIwLCJleHAiOjE3MTQwMzQxMjAsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MiLCJjbGllbnRfaWQiOiJlcGMtbmFiYXRpc25hY2std2ViYXBwIiwiaXNzIjoiaHR0cHM6Ly9jcm9udXMtZGV2LmVkb3QuaWQiLCJhdWQiOiJzdmMtYXV0aCBzdmMtY2hhdCBzdmMtdXNlciB3ZWItdXNlciJ9.gcrT9gCiZajody9OojikpMH2w00kk70ukzYw27nGzkswIoTC0lsftJMJhGKjGm8e0iTVdg1PVx86lgWyz9Ub-4plrDcetScytkQggAiAp5k9BzcKzYehIYnBS_ZWANNIV66jKvxEvBiDC8h2j5AqLnDs2524kZ1vaBBuu3R5VxmC0FjnyvLwdHE2VDQu3iHmK86vzDy4MMmHRFCHcRd4lvmpKE8J6g3CouW5WEQHmW1CMaTE-fX1YZdtirSxv0sw5kvQxTTUS8WCDC7hTjKhdoEHom4S-8lFE7M8uRVYTJz3T50-lmQp8sbU-IV1HjpAlUrmnVB1CZfbo4Y5UQbhgA')
    localStorage.setItem('refresh_token', 'RwZlLkQk0vzNvCBERl_ZVR0CnqLgv-jqX0lCQN2757u')
  }, [])

  return (
    <React.Fragment>
      <DashboardLayout>
        {loading && <Loader />}
        {!pageShow && <PageCannotAccessed />}
        {!loading && pageShow ? <Component {...pageProps} /> : ''}
      </DashboardLayout>
    </React.Fragment>
  )
}
