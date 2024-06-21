import { useQuery } from "react-query"
import { https } from "./https_cost"

interface PropsGetList {
    search?: string
    page?: string
    limit?: string
    sort_by?: string
    sort_order?: string
    onSuccess?: (e: any) => void
}

const MakeQuery = (queryParams: any) => {
    return Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`)
        .join('&');
}
const hooks = {
    GetList: (props: PropsGetList) => {
        const { limit = '1000', page = "1", sort_by, sort_order, onSuccess } = props
        const URI = () => {
            const params: any = {
                limit: limit,
                page: page,
            }
            if (sort_by) params.sort_by = sort_by
            if (sort_order) params.sort_order = sort_order
            const resQuery = MakeQuery(params)
            return `/v1/currency?${resQuery}`
        }
        const {
            isLoading: isPending,
            error,
            data,
            isFetching,
            refetch,
        } = useQuery({
            queryKey: [URI()],
            queryFn: () => https.get(URI()),
            onSuccess: ((e: any) => {
                onSuccess(e)
            })
        })
        return { isPending, error, data, isFetching, refetch, }
    },
}
const send = {}
export const CurrencyAPI = { hooks, send }
