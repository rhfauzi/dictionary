import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PropsGetList } from './types'
import { https } from './calling'

const hooks = {
  GetList: (props: PropsGetList) => {
    const { limit = '20', sort_by, sort_order, onSuccess, search } = props
    const uri = `/v2/master/legal-entity`
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

export const FilterLegalEntityAPI = { hooks }
