import { useQuery } from "react-query"
import { https } from "./calling"
import { TranslateProps } from "./types"

const GetTranslate = (param: TranslateProps = { module: 'mdm', menu: 'cost-center', language: 'en-US' }) => {
    /**
     * Kedepan param di set dengan local storage
     * di ambil dari module active, menu dan language
     */
    const uri = `/locales`
    const {
        data: dataResp,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: [uri],
        queryFn: () => https.get(uri, param),
        enabled: true,
    })

    const transDict:any = dataResp?.data
        ? Object.entries(dataResp?.data)
            .filter(([key]) => key.startsWith("dict"))
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {})
        : {};

    const transMess:any = dataResp?.data
        ? Object.entries(dataResp?.data)
            .filter(([key]) => key.startsWith("message"))
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {})
        : {};

    const filterExcludedPrefixes = (...excludedPrefixes: string[]) => {
        return dataResp?.data
            ? Object.entries(dataResp?.data)
                .filter(([key]) => !excludedPrefixes.some(prefix => key.startsWith(prefix)))
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {})
            : {};
    };

    const transComp:any = filterExcludedPrefixes("dict", "message");
    const transAll: any = dataResp?.data
    return { isLoading, transAll, transDict, transMess, transComp, error, refetch, }
}
export default GetTranslate
