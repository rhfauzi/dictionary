import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PropsGetList } from './types'
import { https } from './calling'

const hooks = {
  GetList: (props: PropsGetList) => {
    const { limit = '20', page = '1', sort_by, sort_order, onSuccess, search } = props
    const uri = `/v2/master/country`
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
          limit,
          page,
          sort_by,
          sort_order,
          search,
        }),
      onSuccess: (e: any) => {
        onSuccess(e)
      },
    })
    return { isPending, error, data, isFetching, refetch }
  },
}

export const FilterCountryAPI = { hooks }
