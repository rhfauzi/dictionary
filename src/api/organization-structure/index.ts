import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PropsGetList, PropsGetDetail } from './types'
import { https } from './calling'

const hooks = {
  GetList: (props: PropsGetList) => {
    const { employee_id, department_id, company_id, country_id, division_id, job_id, onSuccess } =
      props
    const uri = `/v2/organization-structure`
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
          employee_id,
          department_id,
          company_id,
          country_id,
          division_id,
          job_id,
        }),
      onSuccess: (e: any) => {
        onSuccess(e)
      },
    })
    return { isPending, error, data, isFetching, refetch }
  },
  GetDetail: (props: PropsGetDetail) => {
    const { id, onSuccess } = props
    const URI = `/v2/organization-structure/${id}`
    const {
      isLoading: isPending,
      error,
      data,
      isFetching,
      refetch,
    } = useQuery({
      queryKey: [URI],
      queryFn: () => https.get(URI),
      onSuccess: (e: any) => onSuccess(e),
    })
    return { isPending, error, data, isFetching, refetch }
  },
}

const send = {}

export const OrganizationStructureAPI = { hooks, send }
