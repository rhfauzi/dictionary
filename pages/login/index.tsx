import React from 'react'
import PageLogin from 'src/containers/PageLogin'
import { getConfig } from 'src/contexts/UserContext'
// import { authorizationCode } from 'src/utils/openid'
import { Token, Grant } from 'svc-auth-sdk-node'

interface Props {}

export default function Login(props: Props) {
  const {} = props
  React.useEffect(() => {
    const validateConfig = async () => {
      const config = await getConfig()
      const authorizationCode = new Grant.AuthorizationCode.Browser(config)
      authorizationCode.consent()
      //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!",config);
      //   return;
      // const authorizationCode = new Grant.AuthorizationCode.Browser(config)
      // authorizationCode.consent()
    }

    validateConfig()
  }, [])

  return <span />
}
