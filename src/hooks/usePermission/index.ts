import { clientSSO } from './clientSSO'

export const AccessAction = async ({ callback = null }) => {
  await clientSSO('v1/partner-user/permission2', {
    params: {
      company_id: localStorage.getItem('companyCode') || '',
      screen_code: localStorage.getItem('screenCode') || '',
    },
  })
    .then((res) => (callback !== null ? callback(res) : res))
    .catch((e) => (callback !== null ? callback(e, true) : e))
}

type Props = {
  status: (e: boolean) => void
  key: 'View' |
  'Create' |
  'Update' |
  'Delete' |
  'Upload' |
  'Download Data' |
  'Download Template' |
  'Approval'
}

export const SimpleAccessAction = async ({ status, key }: Props) => {
  await clientSSO('v1/partner-user/permission2', {
    params: {
      company_id: localStorage.getItem('companyCode') || '',
      screen_code: localStorage.getItem('screenCode') || '',
    },
  }).then((res) => {
    try {
      const hasMatch = res?.data[0]?.menus[0]?.permission?.some((value: Props['key']) => value?.toLowerCase() === key?.toLowerCase());
      status(hasMatch)
    } catch (error) {
      status(false)
    }
  }).catch((e) => {
    console.log(e);
  })
}