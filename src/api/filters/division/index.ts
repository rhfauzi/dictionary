import { useQuery } from 'react-query'
import { https } from './calling'
import { PropsGetList } from './types'

const hooks = {
  GetList: (props: PropsGetList) => {
    const { company_id, country_id, onSuccess, search } = props
    const uri = `/v2/division`
    const {
      isLoading: isPending,
      error,
      data,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: [uri],
      queryFn: () =>
        https.get(uri, {
          company_id,
          country_id,
          search,
        }),
      onSuccess: (e: any) => {
        onSuccess(e)
      },
    })
    return { isPending, error, data, isFetching, refetch }
  },
}

export const FiltersDivisionAPI = { hooks }
