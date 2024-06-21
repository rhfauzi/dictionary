import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PropsGetList } from './types'
import { https } from './calling'

const hooks = {
  GetList: (props: PropsGetList) => {
    const { company_id, country_id, division_id, onSuccess, search } = props
    const uri = `/v2/department`
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
          division_id,
          search,
        }),
      onSuccess: (e: any) => {
        onSuccess(e)
      },
    })
    return { isPending, error, data, isFetching, refetch }
  },
}

export const FiltersDepartmentAPI = { hooks }
