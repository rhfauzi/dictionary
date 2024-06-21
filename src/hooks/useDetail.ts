import { useRouter } from 'next/router'
import React from 'react'
import { CommonDetailParams } from 'src/api/types'
import { responseError } from 'src/utils/generalUtils'

export default function useDetail(
  funcApi?: (p: CommonDetailParams) => Promise<any>,
  params?: CommonDetailParams,
  strict: boolean = true,
) {
  const [data, setData] = React.useState<any>({})
  const router = useRouter()

  React.useEffect(() => {
    if (!Object.values(params).includes(undefined)) {
      funcApi(params)
        .then((results) => setData(results.data))
        .catch((e) => {
          responseError(e)
        })
    }
  }, [router.query])

  return data
}
