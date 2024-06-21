import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PropsGetList } from './types'
import { https } from './calling'

const hooks = {
  GetList: (props: PropsGetList) => {
    const {
      country_id,
      division_id,
      company_id,
      job_id,
      department_id,
      onSuccess,
      search,
      limit = '20',
      page = '1',
      sort_by,
      sort_order,
    } = props
    const uri = `/v2/master/employee`
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
          country_id,
          division_id,
          company_id,
          job_id,
          department_id,
          search,
          limit,
          page,
          sort_by,
          sort_order,
        }),
      onSuccess: (e: any) => {
        onSuccess(e)
      },
    })
    return { isPending, error, data, isFetching, refetch }
  },
}

export const FilterEmployeeAPI = { hooks }
